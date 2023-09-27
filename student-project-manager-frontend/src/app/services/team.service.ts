import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  getMembersOfTeam(id: number) {
    return this.http.get<UsersResponse>(`${this.baseUrl}teams/${id}/users`).pipe(
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