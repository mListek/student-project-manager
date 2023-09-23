import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Team } from '../model/team.model';
import { User } from '../model/user.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService implements OnInit{
  user: User = null;
  private baseUrl = 'http://localhost:8080/api/';

  constructor(private authService: AuthService,
              private http: HttpClient) { }

  ngOnInit() {
    this.authService.user.pipe(take(1)).subscribe(user => {
      this.user = user;
    });
  }

  getTeamList(): Observable<Team[]> {
    return this.http.get<TeamResponseData>(`${this.baseUrl}teams`).pipe(
      map(response => response._embedded.teams)
    );
  }

  getUserTeams() {
    return this.http.get<TeamResponseData>(`${this.baseUrl}users/${this.user.id}/teams`).pipe(
      map(response => response._embedded.teams)
    );
  }
}

interface TeamResponseData {
  _embedded: {
    teams: Team[];
  }
}