import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user!: User;
  isLoggedIn = false;
  isTeacher = false;

  constructor(private authService: AuthService) {}
  
  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user;
      if (user !== null) {
        this.isLoggedIn = true;
        if (user.role === 'teacher') {
          this.isTeacher = true;
        }
      }
    });
  }

  onLogout() {
    this.isLoggedIn = false;
    this.isTeacher = false;
    this.authService.logout();
  }
}
