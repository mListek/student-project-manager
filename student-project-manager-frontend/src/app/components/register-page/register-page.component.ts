import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserRequest } from 'src/app/model/user-request.model';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  error: string = '';

  constructor(private authService: AuthService,
              private router: Router) {}

  onRegister(form: NgForm) {
    if (!form.valid) return;

    if (form.value.repeatPassword !== form.value.password) {
      this.error = 'Hasła nie są takie same!';
      return;
    }

    if (form.value.repeatEmail !== form.value.email) {
      this.error = 'Emaile nie są takie same!';
      return;
    }

    if (!form.value.teacher && !form.value.code) {
      this.error = 'Konto studenta wymaga podania kodu grupy!';
      return;
    }

    if (form.value.teacher && form.value.code) {
      this.error = 'Dla konta wykładowcy nie wpisuj kodu grupy!';
      return;
    }
    const role = form.value.teacher ? 'teacher' : 'student';

    const userRequest: UserRequest = new UserRequest(
      form.value.email,
      form.value.firstName,
      form.value.lastName,
      form.value.password,
      role,
      form.value.code
    );
    
    
    this.authService.signup(userRequest).subscribe(
      resData => {
        console.log('Register page component data...');
        console.log(resData);
        this.router.navigate(['/tasks']);
      },
      error => {
        this.error = error;
      }
      );
      form.reset();
  }
}
