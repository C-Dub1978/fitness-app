import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  onSubmitForm(form: NgForm) {
    console.log('form: ', form);
  }
}
