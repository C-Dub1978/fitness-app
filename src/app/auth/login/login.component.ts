import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from './../auth.service';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy, OnInit {
  loginForm: FormGroup;
  authSub: Subscription;
  isLoading = false;
  loadingSub: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) {}

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  ngOnInit() {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.authSub = this.authService.authChange.subscribe(authStatus => {});
  }

  onSubmitLogin() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
}
