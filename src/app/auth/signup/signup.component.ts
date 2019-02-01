import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from './../auth.service';
import { UIService } from './../../shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnDestroy, OnInit {
  maxDate: Date;
  isLoading = false;
  uiSub: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) {}

  ngOnDestroy() {
    if (this.uiSub) {
      this.uiSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.uiSub = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmitForm(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
}
