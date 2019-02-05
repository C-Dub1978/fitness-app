import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription, Observable } from 'rxjs';
// the following format is best practice - using fromApp for the reducer
import * as fromRoot from '../../app.reducer';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  authSub: Subscription;
  isLoading$: Observable<boolean>;
  loadingSub: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  // ngOnDestroy() {
  //   if (this.authSub) {
  //     this.authSub.unsubscribe();
  //   }
  //   if (this.loadingSub) {
  //     this.loadingSub.unsubscribe();
  //   }
  // }

  ngOnInit() {
    // Since isLoading is now an observable here, we will set it to the value
    // of the store's current ui state.isLoading value, and subscribe to it
    // in our template using the async pipe!!
    // we do NOT have to subscribe to anything store related (or unsubscribe)
    // because NgRx takes care of it for us
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmitLogin() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
}
