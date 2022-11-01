import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, switchMap, of, map } from 'rxjs';
import { AppUser } from '../models/appUser.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$!: Observable<firebase.User | null>;
  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
    localStorage.removeItem('returnUrl');
  }

  get appUsers$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) return this.userService.get(user.uid);
        return of(null);
      }),
      map((appUser: AppUser) => appUser)
    );
  }
}
