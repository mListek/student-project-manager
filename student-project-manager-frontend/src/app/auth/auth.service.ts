import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../model/user.model";
import { catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

  signup(user: User) {
    return this.http.post<User>(
      'http://localhost:8080/api/register', 
      user
    ).pipe(catchError(this.handleError), tap(res => {
      this.handleAuthentication(res.email, res.firstname, res.lastname, res.password, res.role);
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
      this.handleAuthentication(res.email, res.firstname, res.lastname, res.password, res.role);
    }));
  }

  private handleAuthentication(
    email: string, firstname: string, lastname: string, password: string, role: string) {
      const user = new User(email, firstname, lastname, password, role);
      this.user.next(user);
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