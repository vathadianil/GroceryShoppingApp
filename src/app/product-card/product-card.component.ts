import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('showActions') showActions: boolean;
  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {}

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
  }
}
