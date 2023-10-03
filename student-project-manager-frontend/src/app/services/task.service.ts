import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../model/task.model';
import { User } from '../model/user.model';

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

  getTaskUsers(taskId: number) {
    return this.http.get<UserResponseData>(`${this.baseUrl}tasks/${taskId}/users`).pipe(
      map(response => response._embedded.users)
    );
  }

  addUserToTask(taskId: number, userId: number) {
    return this.http.post(
      `${this.baseUrl}tasks/${taskId}/users/${userId}`,
      {
        userId: userId,
        taskId: taskId
      }
    );
  }

  deleteTaskUser(taskId: number, userId: number) {
    return this.http.delete(`${this.baseUrl}tasks/${taskId}/users/${userId}`);
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

  deleteTask(taskId: number) {
    return this.http.delete(`${this.baseUrl}tasks/${taskId}`);
  }
}

interface TaskResponseData {
  _embedded: {
    tasks: Task[];
  }
}
interface UserResponseData {
  _embedded: {
    users: User[];
  }
}