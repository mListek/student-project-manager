import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Team } from 'src/app/model/team.model';
import { User } from 'src/app/model/user.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  isLoggedIn = false;
  isTeacher = false;
  currentTeam: Team;
  navbarOpen = false;

  constructor(private authService: AuthService,
              private teamService: TeamService) {}
  
  ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user !== null) {
        this.user = user;
        this.isLoggedIn = true;
        if (user.teams[0] !== undefined) {
          this.teamService.setCurrentTeam(user.teams[0]);
        }
        if (user.role === 'teacher') {
          this.isTeacher = true;
        }
      }
    });
    this.teamService.currentTeam.subscribe(
      res => {
        this.currentTeam = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  onLogout() {
    this.navbarOpen = false;
    this.isLoggedIn = false;
    this.isTeacher = false;
    this.currentTeam = null;
    this.authService.logout();
  }
}
