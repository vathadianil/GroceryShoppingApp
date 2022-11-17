import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shoppingCart.model';
import { ShoppingCartItems } from '../models/shoppingCartItems';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cart: ShoppingCart[] = [];
  totalQuantity: number;
  totalPrice: number;
  constructor(private shoppingCartService: ShoppingCartService) {}

  async ngOnInit(): Promise<void> {
    (await this.shoppingCartService.getCart()).subscribe(
      (cart: ShoppingCart[]) => {
        this.totalQuantity = new ShoppingCartItems(
          cart
        ).totalCartItems.quantity;
        this.totalPrice = new ShoppingCartItems(cart).totalCartItems.totalPrice;
        this.cart = cart;
      }
    );
  }
}
