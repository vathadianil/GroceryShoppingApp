import { ShoppingCart } from './shoppingCart.model';

export class ShoppingCartItems {
  constructor(private items: ShoppingCart[]) {}
  get totalCartItems() {
    let count = 0;
    this.items.map((item) => (count += item.quantity));
    return count;
  }
}
