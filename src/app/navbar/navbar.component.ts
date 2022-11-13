import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppUser } from '../models/appUser.model';
import { ShoppingCart } from '../models/shoppingCart.model';
import { ShoppingCartItems } from '../models/shoppingCartItems';
import { AuthService } from '../service/auth.service';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  appUserSubscription: Subscription;
  totalQuantity: number = 0;
  shoppingCartSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit(): Promise<void> {
    this.appUserSubscription = this.authService.appUsers$.subscribe(
      (appUser) => {
        this.appUser = appUser;
      }
    );
    this.shoppingCartSubscription = (
      await this.shoppingCartService.getCart()
    ).subscribe((items: ShoppingCart[]) => {
      this.totalQuantity = new ShoppingCartItems(items).totalCartItems;
    });
  }

  logout() {
    return this.authService.logout();
  }

  ngOnDestroy(): void {
    this.appUserSubscription.unsubscribe();
    this.shoppingCartSubscription.unsubscribe();
  }
}
