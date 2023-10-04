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
  error: string = '';

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
    console.log("click! choosing current team");
    this.teamService.setCurrentTeam(team);
  }

  onDeleteTeam(teamId: number) {
    if (this.teams.length <= 1) {
      this.error = "Nie można usunąć ostatniej grupy!";
      return;
    }
    for (let team of this.teams) {
      if (team.id !== teamId) {
        this.teamService.setCurrentTeam(team);
        break;
      }
    }
    this.teamService.deleteTeam(teamId).subscribe(
      res => {
        console.log(res);
        this.getTeamsOfUser(this.user.id);
      },
      err => {
        console.log(err);
      }
    )
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
