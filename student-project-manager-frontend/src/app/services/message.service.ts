import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Message } from "../model/message.model";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  getMessages(): Observable<Message[]> {
    return this.http.get<MessageResponseData>(this.baseUrl).pipe(
      map(response => response._embedded.messages)
    );
  }

  getTeamMessages(teamId: number) {
    return this.http.get<Message[]>(
      `${this.baseUrl}teams/${teamId}/messages`
    );
  }

  createMessage(label: string, userId: number, teamId: number) {
    return this.http.post(
      `${this.baseUrl}messages`,
      {
        label: label,
        userId: userId,
        teamId: teamId
      }
    );
  }
}

interface MessageResponseData {
  _embedded: {
    messages: Message[];
  }
}