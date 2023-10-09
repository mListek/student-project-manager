import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Message } from 'src/app/model/message.model';
import { Team } from 'src/app/model/team.model';
import { User } from 'src/app/model/user.model';
import { MessageService } from 'src/app/services/message.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.css']
})
export class MessagePageComponent implements OnInit {
  user: User;
  currentTeam: Team;
  messages: Message[] = [];

  constructor(private authService: AuthService,
              private teamService: TeamService,
              private messageService: MessageService) {}
  
  ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user !== null) {
        this.user = user;
      }
    });
    this.teamService.currentTeam.subscribe(currentTeam => {
      this.currentTeam = currentTeam;
      if (currentTeam !== null) {
        this.getTeamMessages(currentTeam.id);
      }
    });
  }

  onSendMessage(form: NgForm) {
    this.messageService.createMessage(
      form.value.messageContent,
      this.user.id,
      this.currentTeam.id
    ).subscribe(
      res => {
        console.log(res);
        this.getTeamMessages(this.currentTeam.id);
      },
      err => {
        console.log(err);
      }
    );
    form.reset();
  }

  private getTeamMessages(teamId: number) {
    this.messageService.getTeamMessages(teamId).subscribe(
      res => {
        if (res !== null) {
          console.log(res);
          this.messages = res;
        }
      },
      err => {
        console.log(err);
      }
    )
  }
}
