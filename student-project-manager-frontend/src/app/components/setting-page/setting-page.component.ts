import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Team } from 'src/app/model/team.model';
import { User } from 'src/app/model/user.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.css']
})
export class SettingPageComponent implements OnInit {
  user: User;
  error: string = '';
  currentTeam: Team;

  constructor(private authService: AuthService,
              private teamService: TeamService) {}
  
  ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user !== null) {
        this.user = user;
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

  onAddTeam(form: NgForm) {
    this.teamService.addUserToTeam(this.user.id, form.value.code).subscribe(
      res => {
        console.log(res);
        this.authService.setCurrentUser(res);
      },
      err => {
        console.log(err);
        this.error = err.error;
      }
    )
  }

  onLeaveTeam() {
    this.teamService.deleteMember(this.user.id, this.currentTeam.id).subscribe(
      res => {
        console.log(res);
        this.teamService.setCurrentTeam(null);
      },
      err => {
        console.log(err);
      }
    )
  }

  deleteUser() {
    this.authService.deleteUser(this.user.id).subscribe();
    this.authService.setCurrentUser(null);
  }
}
