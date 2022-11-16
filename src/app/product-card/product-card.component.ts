import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shoppingCart.model';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('showActions') showActions: boolean;
  @Input('shoppingCart') shoppingCart: ShoppingCart[];
  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {}

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }
  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
  }
  getQuantity() {
    if (!this.shoppingCart) return 0;
    const item = this.shoppingCart.filter((item) => {
      return item.key === this.product.key;
    });

    return item[0]?.quantity ? item[0]?.quantity : 0;
  }
}
