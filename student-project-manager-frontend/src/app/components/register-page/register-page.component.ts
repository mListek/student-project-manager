import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  constructor(private authService: AuthService) {}

  onRegister(form: NgForm) {
    if (!form.valid) return;

    const role = form.value.teacher ? 'teacher' : 'student';

    const user: User = new User(
      form.value.email,
      form.value.firstname,
      form.value.lastname,
      form.value.password,
      role
    );

    console.log(user);
    
    this.authService.signup(user).subscribe(
      resData => {
        console.log(resData);
      },
      error => {
        console.log(error);
      }
    );
    form.reset();
  }
}
