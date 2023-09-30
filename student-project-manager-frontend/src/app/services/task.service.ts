import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  getTaskList(): Observable<Task[]> {
    return this.http.get<TaskResponseData>(this.baseUrl + 'tasks').pipe(
      map(response => response._embedded.tasks)
    );
  }

  getTask(taskId: number) {
    return this.http.get<Task>(`${this.baseUrl}tasks/${taskId}`);
  }

  getTeamTasks(teamId: number) {
    return this.http.get<Task[]>(
      `${this.baseUrl}teams/${teamId}/tasks`
    );
  }

  createTask(description: string, userId: number, teamId: number) {
    return this.http.post(`${this.baseUrl}tasks`,
      {
        teamId: teamId,
        description: description,
        userId: userId
      })
  }

  updateTask(task: Task) {
    return this.http.put(`${this.baseUrl}tasks/${task.id}`, task);
  }
}

interface TaskResponseData {
  _embedded: {
    tasks: Task[];
  }
}