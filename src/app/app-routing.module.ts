import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';
import { AdminAuthGaurdService } from './service/admin-auth-gaurd.service';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'check-out',
    component: CheckOutComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'order-success',
    component: OrderSuccessComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGaurdService, AdminAuthGaurdService],
  },
  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [AuthGaurdService, AdminAuthGaurdService],
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGaurdService, AdminAuthGaurdService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
