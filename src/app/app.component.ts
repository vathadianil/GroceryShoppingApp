import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './service/auth.service';
import { ShoppingCartService } from './service/shopping-cart.service';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  authUserSubscription: Subscription;
  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.authUserSubscription = this.auth.user$.subscribe((user) => {
      if (!user) return;
      this.userService.save(user);
      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;
      localStorage.removeItem('returnUrl');
      this.router.navigate([returnUrl]);
    });
  }

  ngOnDestroy(): void {
    this.authUserSubscription.unsubscribe();
  }
}
