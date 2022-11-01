import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppUser } from '../models/appUser.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  appUserSubscription: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.appUserSubscription = this.authService.appUsers$.subscribe(
      (appUser) => {
        this.appUser = appUser;
      }
    );
  }

  logout() {
    return this.authService.logout();
  }

  ngOnDestroy(): void {
    this.appUserSubscription.unsubscribe();
  }
}
