import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/model/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {
  todoTasks: Task[] = [];
  doingTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  onCreateTask(form: NgForm) {
    this.taskService.createTask(form.value.taskName).subscribe(
      res => {
        console.log(res);
        this.getTasks();
      },
      err => {
        console.log(err);
      }
    );
    form.reset();
  }

  private getTasks() {
    this.taskService.getTaskList().subscribe(
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
