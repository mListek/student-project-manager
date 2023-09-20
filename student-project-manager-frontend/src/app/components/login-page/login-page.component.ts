import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  onLogin(form: NgForm) {
    const value = form.value;
    console.log(value.email + ' - ' + value.password);
    console.log(form);
  }
}
