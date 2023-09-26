import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Team } from 'src/app/model/team.model';
import { User } from 'src/app/model/user.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-group-details-page',
  templateUrl: './group-details-page.component.html',
  styleUrls: ['./group-details-page.component.css']
})
export class GroupDetailsPageComponent implements OnInit {
  user!: User;
  currentTeam: Team;
  teamMembers: User[];

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private teamService: TeamService) {}
  
  ngOnInit() {
    // const teamId = +this.route.snapshot.paramMap.get('id');
    // this.teamService.getMembersOfTeam(teamId).subscribe(res => {
    //   this.teamMembers = res;
    // },
    // err => {
    //   console.log('error');
    //   console.log(err);
    // });
    // this.authService.user.subscribe(user => {
    //   this.user = user;
    //   if (user !== null) {
    //     if (user.teams[0] !== undefined) {
    //       this.currentTeam = user.teams[0];
    //     }
    //   }
    // });
  }

  onMemberDelete(userId: number) {
    // this.teamService.deleteMember(userId, this.currentTeam.id).subscribe(res => {
    //   console.log(res);
    // },
    // err => {
    //   console.log(err);
    // });
  }
}
