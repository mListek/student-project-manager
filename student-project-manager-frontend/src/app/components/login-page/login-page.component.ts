import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  error: string = '';

  constructor(private authService: AuthService,
              private router: Router) {}

  onLogin(form: NgForm) {
    console.log(form.value.email, form.value.password);
    if (!form.valid) return;

    this.authService.login(form.value.email, form.value.password).subscribe(
      resData => {
        console.log(resData);
        this.router.navigate(['/tasks']);
      },
      error => {
        this.error = error;
      }
    )
  }
}
