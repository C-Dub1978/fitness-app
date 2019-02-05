import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription, Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';

import { AuthService } from './../auth.service';
import { UIService } from './../../shared/ui.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  isLoading$: Observable<boolean>;
  uiSub: Subscription;

  constructor(
    private authService: AuthService,
    /* private uiService: UIService, */
    private store: Store<fromRoot.State>
  ) {}

  // ngOnDestroy() {
  //   if (this.uiSub) {
  //     this.uiSub.unsubscribe();
  //   }
  // }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.uiSub = this.uiService.loadingStateChanged.subscribe(isLoading => {
    //   this.isLoading = isLoading;
    // });
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
