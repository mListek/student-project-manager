import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) { }

  getTaskList(): Observable<Task[]> {
    return this.http.get<TaskResponseData>(this.baseUrl).pipe(
      map(response => response._embedded.tasks)
    );
  }
}

interface TaskResponseData {
  _embedded: {
    tasks: Task[];
  }
}