import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs/Subject';

import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.authSuccessful();
      })
      .catch(error => {
        this.authChange.next(false);
      });
  }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.authSuccessful();
      })
      .catch(error => {
        this.authChange.next(false);
      });
  }

  logout() {
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['']);
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessful() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
