import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shoppingCart.model';
import { ProductService } from '../service/product.service';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  productServiceSubscription: Subscription;
  shoppingCartSubscription: Subscription;
  category: string;
  cart: any;
  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.productServiceSubscription = this.productService
      .getAll()
      .pipe(
        switchMap((products) => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');
        this.filteredProducts = this.category
          ? this.products.filter((p) => p.category === this.category)
          : this.products;
      });

    this.shoppingCartSubscription = (
      await this.shoppingCartService.getCart()
    ).subscribe((cart: ShoppingCart[]) => {
      this.cart = cart;
    });
  }
  ngOnDestroy(): void {
    this.productServiceSubscription.unsubscribe();
    this.shoppingCartSubscription.unsubscribe();
  }
}
