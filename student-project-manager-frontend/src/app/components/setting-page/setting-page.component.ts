import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.css']
})
export class SettingPageComponent implements OnInit {
  user: User;
  error: string = '';

  constructor(private authService: AuthService,
              private http: HttpClient) {}
  
  ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user !== null) {
        this.user = user;
      }
    });
  }

  onSettingsChanged(form: NgForm) {
    if (!form.valid) return;
    if (form.value.repeatPassword !== form.value.password) {
      this.error = 'Hasła nie są takie same!';
      return;
    }
    if (form.value.password.length >= 6) {
      console.log(form.value.password.length);
      this.user.password = form.value.password;
    }
    this.authService.updateUser(this.user).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
    form.reset();
  }
}
