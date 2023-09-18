import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Message } from "../model/message.model";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baseUrl = 'http://localhost:8080/api/messages';

  constructor(private http: HttpClient) { }

  getMessages(): Observable<Message[]> {
    return this.http.get<MessageResponseData>(this.baseUrl).pipe(
      map(response => response._embedded.messages)
    );
  }
}

interface MessageResponseData {
  _embedded: {
    messages: Message[];
  }
}