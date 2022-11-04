import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: {
    title: string;
    price: string;
    category: string;
    imageUrl: string;
  };
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();

    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.get(id).subscribe((product: any) => {
        this.product = product;
        console.log(this.product);
      });
    }
    // this.route.params.subscribe((params) => {
    //   let id = params['id'];
    //   this.getProductByid(id);
    // });
  }

  // getProductByid(id) {
  //   this.productService.get(id).subscribe((product) => console.log(product));
  // }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
