import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  @ViewChild('f', { static: false }) productForm: NgForm;
  categories$;
  product = {
    title: '',
    price: 0,
    category: '',
    imageUrl: '',
  };
  id;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).subscribe((product: any) => {
        this.product = product[0];
        this.productForm.form.patchValue({
          title: this.product?.title,
          price: this.product?.price,
          category: this.product?.category,
          imageUrl: this.product?.imageUrl,
        });
      });
    }
    // this.route.params.subscribe((params) => {
    //   let id = params['id'];
    //   this.getProductByid(id);
    // });
  }

  // getProductByid(id) {
  //   this.productService.get(id).subscribe((product: any) => {
  //     console.log(product);
  //     this.product = product;
  //     this.productForm.form.patchValue({
  //       title: product[0].title,
  //     });
  //   });
  // }

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
