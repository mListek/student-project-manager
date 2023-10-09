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

  addUserToTeam(userId: number, teamCode: string) {
    return this.http.post<User>(
      `${this.baseUrl}users/${userId}/teams`,
      teamCode
    )
  }

  getTeamsOfUser(userId: number) {
    return this.http.get<Team[]>(
      `${this.baseUrl}users/${userId}/teams`);
  }

  getMembersOfTeam(teamId: number) {
    return this.http.get<UsersResponse>(`${this.baseUrl}teams/${teamId}/users`).pipe(
      map(res => res._embedded.users)
    );
  }

  deleteMember(userId: number, teamId: number) {
    return this.http.delete(`${this.baseUrl}users/${userId}/teams/${teamId}`);
  }

  deleteTeam(teamId: number) {
    return this.http.delete(`${this.baseUrl}teams/${teamId}`);
  }
}

interface UsersResponse {
  _embedded: {
    users: User[];
  }
}