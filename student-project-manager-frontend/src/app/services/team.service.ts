import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { Team } from '../model/team.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl = 'http://localhost:8080/api/';

  constructor(private authService: AuthService,
              private http: HttpClient) { }

  getTeamList(): Observable<Team[]> {
    return this.http.get<TeamResponseData>(`${this.baseUrl}teams`).pipe(
      map(response => response._embedded.teams)
    );
  }

  getUserTeams() {
    return this.authService.user.pipe(exhaustMap(user => {
      return this.http.get<TeamResponseData>(`${this.baseUrl}users/${user.id}/teams`);
    }),
      map(response => response._embedded.teams)
    );
  }
}

interface TeamResponseData {
  _embedded: {
    teams: Team[];
  }
}