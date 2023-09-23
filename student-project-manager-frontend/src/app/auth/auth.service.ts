import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../model/user.model";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,
              private router: Router) {}

  signup(user: User) {
    return this.http.post<User>(
      'http://localhost:8080/api/register', 
      user
    ).pipe(catchError(this.handleError), tap(res => {
      this.handleAuthentication(+res.id, res.email, res.firstname, res.lastname, res.password, res.role);
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
      console.log('auth service res:')
      console.log(res);
      this.handleAuthentication(+res.id, res.email, res.firstname, res.lastname, res.password, res.role);
    }));
  }

  autoLogin() {
    const userData: {
      id: number;
      email: string;
      firstname: string;
      lastname: string;
      password: string;
      role: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.id,
      userData.email,
      userData.firstname,
      userData.lastname,
      userData.password,
      userData.role
    );

    this.user.next(loadedUser);
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  private handleAuthentication(
    id: number, email: string, firstname: string, lastname: string, password: string, role: string) {
      const user = new User(id, email, firstname, lastname, password, role);
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
    }
    return throwError(() => errorMessage);
  }
}