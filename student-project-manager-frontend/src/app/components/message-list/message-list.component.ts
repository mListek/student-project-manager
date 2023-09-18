import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/model/message.model';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.getMessages().subscribe(response => {
      this.messages = response;
    })
  }
}
