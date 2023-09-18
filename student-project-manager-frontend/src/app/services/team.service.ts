import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from '../model/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private baseUrl = 'http://localhost:8080/api/teams';

  constructor(private http: HttpClient) { }

  getTeamList(): Observable<Team[]> {
    return this.http.get<TeamResponseData>(this.baseUrl).pipe(
      map(response => response._embedded.teams)
    );
  }
}

interface TeamResponseData {
  _embedded: {
    teams: Team[];
  }
}