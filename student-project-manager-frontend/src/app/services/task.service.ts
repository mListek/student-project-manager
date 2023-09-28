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

  createTask(description: string) {
    return this.http.post(`http://localhost:8080/api/teams/1/tasks`,
      {
        teamId: 1,
        description: description,
        status: 'todo',
        userId: 1
      })
  }
}

interface TaskResponseData {
  _embedded: {
    tasks: Task[];
  }
}