import { Component, ViewChild, Output, Input, EventEmitter, ElementRef } from '@angular/core';
import { Ng2Cable, Broadcaster } from 'ng2-cable';

import { CollaborationComponent } from '../collaboration/collaboration.component';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-chat-text-input',
  templateUrl: './chat-text-input.component.html',
  styleUrls: ['./chat-text-input.component.css'],
  providers: [Ng2Cable, Broadcaster, MessageService]
})
export class ChatTextInputComponent {
  @Input('collabMod') collabMod: CollaborationComponent;
  @ViewChild('inputElement') inputElement: ElementRef;
  fieldValue: string = '';
  messageIsSending: boolean = false;

  constructor(collaboration: CollaborationComponent,
              private MessageService: MessageService,
              private ng2cable: Ng2Cable,
              private broadcaster: Broadcaster) {
  }

  sendMessage(value: string) {
    if (this.messageIsSending || value.length < 2) return;
    this.messageIsSending = true;
    this.MessageService.createMessage(value, this.messageSendSuccess, this.messageSendFailure);
  }

  messageSendSuccess = (data) => {
    this.messageIsSending = false;
    this.fieldValue = '';
    this.inputElement.nativeElement.focus();
  }

  messageSendFailure = (data) => {
    this.messageIsSending = false;
    this.inputElement.nativeElement.focus();
  }
}
