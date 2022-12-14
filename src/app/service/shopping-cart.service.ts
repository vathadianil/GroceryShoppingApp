import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { map, of, take } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  isCreateCartCalled = false;
  cartId: string;
  private itemRef: AngularFireList<any>;
  private shoppingCartRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {}

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    this.shoppingCartRef = this.db.list(
      '/shopping-carts/' + cartId + '/items/'
    );
    return this.shoppingCartRef.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => {
          return { key: c.payload.key, ...c.payload.val() };
        })
      )
    );
  }

  addToCart(product: Product) {
    this.updateQuantity(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateQuantity(product, -1);
  }

  async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    if (!this.isCreateCartCalled) {
      this.isCreateCartCalled = true;
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    } else {
      return cartId;
    }
  }

  private create() {
    return this.db
      .list('/shopping-carts')
      .push({ dateCreated: new Date().getTime() });
  }

  private async updateQuantity(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    this.getItem(cartId)
      .pipe(take(1))
      .subscribe((items) => {
        let quantity = 1;
        items.map((item) => {
          if (item.key === product.key) {
            quantity = item.quantity + change;
          }
        });
        quantity === 0
          ? this.reomveItem(cartId, product.key)
          : this.createOrUpdateItem(cartId, product.key, product, quantity);
      });
  }

  private getItem(cartId: string) {
    this.itemRef = this.db.list('shopping-carts/' + cartId + '/items/');
    return this.itemRef.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => {
          return { key: c.payload.key, ...c.payload.val() };
        })
      )
    );
  }

  private createOrUpdateItem(
    cartId: string,
    productId: string,
    product: Product,
    quantity: number
  ) {
    return this.db
      .list('shopping-carts/' + cartId + '/items/')
      .update(productId, { product, quantity });
  }

  private reomveItem(cartId: string, key: string) {
    return this.db.list('shopping-carts/' + cartId + '/items/').remove(key);
  }
}
