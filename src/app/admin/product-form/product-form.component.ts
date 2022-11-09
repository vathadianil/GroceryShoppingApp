import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  @ViewChild('f', { static: true }) productForm: NgForm;
  categories$;
  product: Product;
  id;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll();

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.id = params['id'];
          if (this.id) return this.productService.get(this.id);
          return of(null);
        })
      )
      .subscribe((product: Product[]) => {
        if (product) {
          this.product = product[0];
          this.productForm.form.patchValue({
            title: this.product?.title,
            price: this.product?.price,
            category: this.product?.category,
            imageUrl: this.product?.imageUrl,
          });
        }
      });
  }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure want to delete?')) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
