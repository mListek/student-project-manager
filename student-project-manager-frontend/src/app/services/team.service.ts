import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { BehaviorSubject, map } from 'rxjs';
import { Team } from '../model/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  currentTeam = new BehaviorSubject<Team>(null);
  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  setCurrentTeam(team: Team) {
    this.currentTeam.next(team);
  }

  createTeam(teamName: string, userId: number) {
    console.log('create team teamservice');
    return this.http.post(
      `${this.baseUrl}teams`,
      {
        name: teamName,
        userId: userId
      }
    )
  }

  getTeamsOfUser(userId: number) {
    return this.http.get<TeamsResponse>(
      `${this.baseUrl}users/${userId}/teams`).pipe(
        map(res => res._embedded.teams)
    );
  }

  getMembersOfTeam(teamId: number) {
    return this.http.get<UsersResponse>(`${this.baseUrl}teams/${teamId}/users`).pipe(
      map(res => res._embedded.users)
    );
  }

  deleteMember(userId: number, teamId: number) {
    this.http.delete(`${this.baseUrl}users/${userId}/teams/${teamId}`);
  }
}

interface UsersResponse {
  _embedded: {
    users: User[];
  }
}

interface TeamsResponse {
  _embedded: {
    teams: Team[];
  }
}