import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { LoginComponent } from './login/login.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    LoginComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    CustomFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent],
})
export class AppModule {}
