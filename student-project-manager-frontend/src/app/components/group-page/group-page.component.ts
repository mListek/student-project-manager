import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Team } from 'src/app/model/team.model';
import { User } from 'src/app/model/user.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent implements OnInit {
  user: User;
  teams: Team[] = [];

  constructor(private authService: AuthService,
              private teamService: TeamService) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user !== null) {
        this.user = user;
        this.getTeamsOfUser(user.id);
      }
    });
  }

  chooseCurrentTeam(team: Team) {
    this.teamService.setCurrentTeam(team);
  }

  onCreateGroup(form: NgForm) {
    if (!form.valid) return;
    console.log('clicked create group');
    this.teamService.createTeam(form.value.teamName, this.user.id).subscribe(
      res => {
        console.log(res);
        this.getTeamsOfUser(this.user.id);
      },
      err => {
        console.log(err);
      }
    );
    form.reset();
  }

  private getTeamsOfUser(userId: number) {
    this.teamService.getTeamsOfUser(userId).subscribe(
      res => {
        this.teams = res;
      },
      err => {
        console.log(err);
      }
    );
  }
}
