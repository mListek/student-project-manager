import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Team } from 'src/app/model/team.model';
import { User } from 'src/app/model/user.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-group-details-page',
  templateUrl: './group-details-page.component.html',
  styleUrls: ['./group-details-page.component.css']
})
export class GroupDetailsPageComponent implements OnInit, OnDestroy {
  user: User;
  isTeacher = false;
  currentTeam: Team;
  teamMembers: User[];

  constructor(private authService: AuthService,
              private teamService: TeamService) {}
  
  ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user !== null) {
        this.user = user;
        this.teamService.currentTeam.subscribe(
          res => {
            this.currentTeam = res;
            if (this.currentTeam !== null) {
              this.teamService.getMembersOfTeam(this.currentTeam.id).subscribe(res => {
                this.teamMembers = res;
                console.log(this.teamMembers);
              },
              err => {
                console.log(err);
              });
            }
          },
          err => {
            console.log(err);
          }
        )
        if (user.role === 'teacher') {
          this.isTeacher = true;
        }
      }
    });
  }

  onMemberDelete(userId: number) {
    console.log('deleting user from group, id: ' + userId);
    this.teamService.deleteMember(userId, this.currentTeam.id).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnDestroy() {
    this.isTeacher = false;
  }
}