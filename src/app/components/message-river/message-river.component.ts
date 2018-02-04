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
  chat_stream_opened: boolean;
  adminView: boolean = false;
  chatStreamIds: any;

  constructor(private MessageService: MessageService,
              private ng2cable: Ng2Cable,
              private broadcaster: Broadcaster) { }

  ngOnInit() {
    this.chat_stream_opened = false;
    this.getMessages();
    this.MessageService.getChatRoomStatus(1, this.chatRoomStatusLoaded, this.chatRoomStatusFailure);
  }

  initActionCable(chat_stream_id: string): void {
    this.ng2cable.subscribe('/cable', 'ChatChannel', { 'chat_stream_id': chat_stream_id });
    this.broadcaster.on<Object>('newMessage').subscribe(this.singleMessageLoaded);
    this.chat_stream_opened = true;
  }

  getMessages(): void {
    this.MessageService.getMessages(this.messagesLoaded, null);
  }

  messagesLoaded = (data: Array<Object>) => {
    this.messages = this.sortMessagesById(data);
    if (this.messages.length > 0 && !this.chat_stream_opened) {
      this.initActionCable(this.messages[0]['chat_stream_id']);
    }
    let allChatStreamIds = new Set();
    for(let i in this.messages) {
      allChatStreamIds.add(this.messages[i]['chat_stream_id']);
    }
    this.chatStreamIds = Array.from(allChatStreamIds);
    if (allChatStreamIds.size > 1) this.adminView = true;
  }

  singleMessageLoaded = (msg) => {
    this.messages.unshift(msg);
  }

  chatRoomStatusLoaded = (data: Array<Object>) => {
    if (data['awake'] == true) {
      this.setStatus('');
      if (!this.chat_stream_opened) this.initActionCable(data['chat_stream_id']);
    } else {
      this.setStatus('There was an issue connecting...');
    }
  }

  chatRoomStatusFailure = (data: Array<Object>) => {
    this.setStatus('There was an issue. Please refresh');
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
