import { Component, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user!: User;

  constructor(private authService: AuthService) {}
  
  ngOnInit() {
    this.authService.user.pipe(take(1)).subscribe(user => {
      this.user = user;
    });
  }
}
