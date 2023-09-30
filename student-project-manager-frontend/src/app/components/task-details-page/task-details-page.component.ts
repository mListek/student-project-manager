import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/model/task.model';
import { User } from 'src/app/model/user.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-details-page',
  templateUrl: './task-details-page.component.html',
  styleUrls: ['./task-details-page.component.css']
})
export class TaskDetailsPageComponent implements OnInit {
  currentTask: Task;
  taskUsers: User;

  constructor(private taskService: TaskService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.taskService.getTask(+this.route.snapshot.paramMap.get('id')).subscribe(
      res => {
        if (res !== null) {
          const task: Task = new Task(res.id, res.description, res.status);
          this.currentTask = task;

        }
      },
      err => {
        console.log(err);
      }
    )
  }

  onEdit(form: NgForm) {
    if (!form.valid) return;

    this.taskService.updateTask(this.currentTask).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  changeStatus(btn: HTMLButtonElement) {
    this.currentTask.status = btn.value;
    this.taskService.updateTask(this.currentTask).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }
}
