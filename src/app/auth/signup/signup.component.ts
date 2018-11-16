import { AuthData } from './../auth-data.model';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  maxDate;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmitForm(form: NgForm) {
    const authData: AuthData = {
      email: form.value.email,
      password: form.value.password
    };
    this.authService.registerUser(authData);
  }
}
