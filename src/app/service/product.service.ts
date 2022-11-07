import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    this.productRef = this.db.list('/products');
    return this.productRef.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => {
          return { key: c.payload.key, ...c.payload.val() };
        })
      )
    );
  }

  get(productId) {
    return this.db
      .list('/products/', (ref) => ref.orderByKey().equalTo(productId))
      .valueChanges();
  }
  update(productId, product) {
    return this.db.list('/products/').update(productId, product);
  }

  delete(productId) {
    return this.db.list('/products/').remove(productId);
  }
}
