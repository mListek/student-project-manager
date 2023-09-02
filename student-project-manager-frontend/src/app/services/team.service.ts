import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../common/team';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private baseUrl = 'http://localhost:8080/api/teams';

  constructor(private httpClient: HttpClient) { }

  getTeamList(): Observable<Team[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.teams)
    );
  }
}

interface GetResponse {
  _embedded: {
    teams: Team[];
  }
}