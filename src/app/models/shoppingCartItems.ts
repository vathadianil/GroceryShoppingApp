import { ShoppingCart } from './shoppingCart.model';

export class ShoppingCartItems {
  constructor(private items: ShoppingCart[]) {}
  get totalCartItems() {
    let quantity = 0;
    let totalPrice = 0;
    this.items.map((item) => {
      quantity += item.quantity;
      totalPrice += item.product.price * item.quantity;
    });
    return { quantity, totalPrice };
  }
}
