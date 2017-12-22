import { Component, OnInit } from '@angular/core';
import { Ng2Cable, Broadcaster } from 'ng2-cable';

import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message-river',
  templateUrl: './message-river.component.html',
  styleUrls: ['./message-river.component.scss'],
  providers: [ MessageService, Ng2Cable, Broadcaster ]
})
export class MessageRiverComponent implements OnInit {

  messages: Array<Object>;

  constructor(private MessageService: MessageService,
              private ng2cable: Ng2Cable,
              private broadcaster: Broadcaster) { }

  userStyle(message): boolean {
    return message["style"]=='user'
  }

  botStyle(message): boolean {
    return message["style"]=='bot'
  }

  ngOnInit() {
    this.getMessages();
    this.ng2cable.subscribe('/cable', 'ChatChannel');

    this.broadcaster.on<Object>('newMessage').subscribe(this.singleMessageLoaded);
  }

  getMessages(): void {
    this.MessageService.getMessages(this.messagesLoaded, null);
  }

  messagesLoaded = (data: Array<Object>) => {
    this.messages = data.sort(this.messageSort);
  }

  singleMessageLoaded = (msg) => {
    this.messages.unshift(msg);
  }

  messageSort(a,b) {
    if (a['id'] < b['id']) return 1;
    if (a['id'] > b['id']) return -1;
    return 0;
  }
}
