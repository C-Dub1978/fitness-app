import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy, OnInit {
  loginForm: FormGroup;
  isAuth;
  touched = false;
  authSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.authSub = this.authService.authChange.subscribe(authStatus => {
      if (authStatus === true) {
        this.isAuth = true;
      } else {
        this.touched = true;
        this.isAuth = false;
        this.loginForm.reset();
      }
    });
  }

  onSubmitLogin() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
}
