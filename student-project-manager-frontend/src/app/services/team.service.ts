import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  getMembersOfTeam(id: number) {
    // return this.http.get<User[]>(`${this.baseUrl}teams/${id}/users`);
  }

  deleteMember(userId: number, teamId: number) {
    // return this.http.delete(`${this.baseUrl}users/${userId}/teams/${teamId}`);
  }
}