import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';

import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    console.log('registering user: ', authData);
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessful('login');
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessful('training');
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccessful(route: string) {
    this.authChange.next(true);
    this.router.navigate(['/', route]);
  }
}
