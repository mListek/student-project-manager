import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/model/task.model';
import { Team } from 'src/app/model/team.model';
import { User } from 'src/app/model/user.model';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-task-details-page',
  templateUrl: './task-details-page.component.html',
  styleUrls: ['./task-details-page.component.css']
})
export class TaskDetailsPageComponent implements OnInit {
  currentTask: Task;
  taskUsers: User[];
  membersOfTeam: User[];
  currentTeam: Team;

  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private router: Router,
              private teamService: TeamService) {}

  ngOnInit() {
    this.taskService.getTask(+this.route.snapshot.paramMap.get('id')).subscribe(
      res => {
        if (res !== null) {
          const task: Task = new Task(res.id, res.description, res.status);
          this.currentTask = task;
          this.getTaskUsers();
        }
      },
      err => {
        console.log(err);
      }
    );
    this.teamService.currentTeam.subscribe(
      res => {
        if (res !== null) {
          this.currentTeam = res;
          this.getMembersOfTeam();
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  private getTaskUsers() {
    this.taskService.getTaskUsers(this.currentTask.id).subscribe(
      res => {
        this.taskUsers = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  private getMembersOfTeam() {
    this.teamService.getMembersOfTeam(this.currentTeam.id).subscribe(
      res => {
        this.membersOfTeam = res;
      },
      err => {
        console.log(err);
      }
    );
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

  filterOptions() {
    this.membersOfTeam = this.membersOfTeam.filter(member => {
      return !this.taskUsers.find(({ id }) => member.id === id);
    });
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

  onDeleteTask() {
    this.taskService.deleteTask(this.currentTask.id).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/tasks']);
      },
      err => {
        console.log(err);
      }
    )
  }


  onAddUser(form: NgForm) {
    if (+form.value.users === null || +form.value.users === undefined) { return; }
    this.taskService.addUserToTask(this.currentTask.id, +form.value.users).subscribe(
      res => {
        console.log(res);
        this.getTaskUsers();
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteTaskUser(userId: number) {
    this.taskService.deleteTaskUser(this.currentTask.id, userId).subscribe(
      res => {
        console.log(res);
        this.getTaskUsers();
        this.getMembersOfTeam();
      },
      err => {
        console.log(err);
      }
    )
  }
}
