import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ng2Cable, Broadcaster } from 'ng2-cable';

import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message-river',
  templateUrl: './message-river.component.html',
  styleUrls: ['./message-river.component.scss'],
  providers: [ MessageService, Ng2Cable, Broadcaster ]
})
export class MessageRiverComponent implements OnInit {

  @ViewChild('statusIndicator') statusIndicator: ElementRef;

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
    this.MessageService.getChatRoomStatus(1, this.chatRoomStatusLoaded, this.chatRoomStatusFailure);
  }

  initActionCable(chat_stream_id: string): void {
    this.ng2cable.subscribe('/cable', 'ChatChannel', { 'chat_stream_id': chat_stream_id });
    this.broadcaster.on<Object>('newMessage').subscribe(this.singleMessageLoaded);
  }

  getMessages(): void {
    this.MessageService.getMessages(this.messagesLoaded, null);
  }

  messagesLoaded = (data: Array<Object>) => {
    this.messages = this.sortMessagesById(data);
    const chat_stream_id = this.messages[0]['chat_stream_id']
    this.initActionCable(chat_stream_id);
  }

  singleMessageLoaded = (msg) => {
    this.messages.unshift(msg);
  }

  chatRoomStatusLoaded = (data: Array<Object>) => {
    if (data['awake'] == true) {
      this.setStatus('');
    } else {
      this.setStatus('There was an issue connecting...');
    }
  }

  chatRoomStatusFailure = (data: Array<Object>) => {
    this.setStatus('There is was an issue. Please refresh');
  }

  setStatus(text: string): void {
    this.statusIndicator.nativeElement.innerText = text;
  }

  sortMessagesById(messages): Array<Object> {
    return messages.sort((a,b) => {
      if (a['id'] < b['id']) return 1;
      if (a['id'] > b['id']) return -1;
      return 0;
    });
  }
}
