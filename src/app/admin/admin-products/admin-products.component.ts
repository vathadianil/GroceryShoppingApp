import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  // products$;
  products: Product[];
  filteredProducts: any[];
  getAllProductsSubscription: Subscription;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // this.products$ = this.productService.getAll();
    this.getAllProductsSubscription = this.productService
      .getAll()
      .subscribe((product) => {
        this.products = product;
        this.filteredProducts = this.products;
      });
  }

  search(filter: string) {
    this.filteredProducts = filter
      ? this.products.filter((product) =>
          product.title.toLowerCase().includes(filter.toLowerCase())
        )
      : this.products;
  }

  reloadItems(params) {}

  ngOnDestroy(): void {
    this.getAllProductsSubscription.unsubscribe();
  }
}
