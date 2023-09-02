import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/common/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  teams: Team[] = [];
  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.listTeams();
  }

  listTeams() {
    this.teamService.getTeamList().subscribe(
      data => {
        this.teams = data;
      }
    )
  }

}
