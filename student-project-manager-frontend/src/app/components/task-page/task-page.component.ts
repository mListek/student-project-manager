import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Task } from 'src/app/model/task.model';
import { Team } from 'src/app/model/team.model';
import { User } from 'src/app/model/user.model';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {
  user: User;
  currentTeam: Team;
  todoTasks: Task[] = [];
  doingTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(private taskService: TaskService,
              private authService: AuthService,
              private teamService: TeamService) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user !== null) {
        this.user = user;
      }
    });
    this.teamService.currentTeam.subscribe(currentTeam => {
      if (currentTeam !== null) {
        this.currentTeam = currentTeam;
        this.getTeamTasks(currentTeam.id);
      }
    });
  }

  onCreateTask(form: NgForm) {
    this.taskService.createTask(form.value.taskName, this.user.id, this.currentTeam.id).subscribe(
      res => {
        this.getTeamTasks(this.currentTeam.id);
      },
      err => {
        console.log(err);
      }
    );
    form.reset();
  }

  private getTeamTasks(teamId: number) {
    this.taskService.getTeamTasks(teamId).subscribe(
      res => {
        this.todoTasks = [];
        this.doingTasks = [];
        this.doneTasks = [];
        for (let task of res) {
          if (task.status === 'todo') {
            this.todoTasks.push(task);
          } else if (task.status === 'inprogress') {
            this.doingTasks.push(task);
          } else {
            this.doneTasks.push(task);
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
