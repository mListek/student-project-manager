import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../model/user.model";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { Team } from "../model/team.model";
import { Task } from "../model/task.model";
import { UserRequest } from "../model/user-request.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  deleteUserSub: Observable<Object>;

  constructor(private http: HttpClient,
              private router: Router) {}

  setCurrentUser(user: User) {
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  signup(userRequest: UserRequest) {
    return this.http.post<User>(
      'http://localhost:8080/api/register', 
      userRequest
    ).pipe(catchError(this.handleError), tap(res => {
      this.handleAuthentication(
        +res.id,
        res.email,
        res.firstName,
        res.lastName,
        res.password,
        res.role,
        res.teams,
        res.tasks);
    }));
  }

  login(email: string, password: string) {
    return this.http.post<User>(
      'http://localhost:8080/api/login',
      {
        email: email,
        password: password
      }
    ).pipe(catchError(this.handleError), tap(res => {
      this.handleAuthentication(
        +res.id,
        res.email,
        res.firstName,
        res.lastName,
        res.password,
        res.role,
        res.teams,
        res.tasks);
    }));
  }

  autoLogin() {
    const userData: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      password: string;
      role: string;
      teams: Team[],
      tasks: Task[]
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.id,
      userData.email,
      userData.firstName,
      userData.lastName,
      userData.password,
      userData.role,
      userData.teams,
      userData.tasks
    );

    this.user.next(loadedUser);
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  updateUser(user: User) {
    return this.http.put<User>(`http://localhost:8080/api/users/${user.id}`,
      user
    ).pipe(tap(res => {
      this.handleAuthentication(
        +res.id,
        res.email,
        res.firstName,
        res.lastName,
        res.password,
        res.role,
        res.teams,
        res.tasks);
    }));
  }

  deleteUser(userId: number) {
    this.deleteUserSub = this.http.delete(`http://localhost:8080/api/users/${userId}`);
    this.logout();

    return this.deleteUserSub;
  }

  private handleAuthentication(
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    role: string,
    teams: Team[],
    tasks: Task[]) {
      const user = new User(id, email, firstName, lastName, password, role, teams, tasks);
      this.user.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Wystąpił niespodziewany błąd!';
    if (!errorRes.error) {
      return throwError(() => errorRes);
    }
    if (errorRes.error === "BAD_CREDENTIALS") {
      errorMessage = 'Nie znaleziono takiego użytkownika!';
    }  else if (errorRes.error === "WRONG_PASSWORD") {
      errorMessage = 'Wpisano błędne hasło!';
    } else if (errorRes.error === "ALREADY_EXISTS") {
      errorMessage = 'Taki użytkownik już istnieje!';
    } else if (errorRes.error === "WRONG_CODE") {
      errorMessage = 'Błędny kod grupy!';
    }
    return throwError(() => errorMessage);
  }
}