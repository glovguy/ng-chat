import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service'

@Component({
  selector: 'app-message-river',
  templateUrl: './message-river.component.html',
  styleUrls: ['./message-river.component.scss'],
  providers: [MessageService]
})
export class MessageRiverComponent implements OnInit {

  messages: Object;

  constructor(private MessageService: MessageService) { }

  ngOnInit() {
    this.getMessages();
  }

  getMessages(): void {
    this.MessageService.getMessages(this.messagesLoaded, this.messageLoadFailure);
  }

  messagesLoaded = (data) => {
    this.messages = data;
  }

  messageLoadFailure = (error) => {
    return error;
  }

}
