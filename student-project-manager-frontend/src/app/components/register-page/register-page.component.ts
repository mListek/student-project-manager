import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user.model';

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

    const role = form.value.teacher ? 'teacher' : 'student';

    const user: User = new User(
      form.value.email,
      form.value.firstname,
      form.value.lastname,
      form.value.password,
      role
    );
    
    this.authService.signup(user).subscribe(
      resData => {
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
