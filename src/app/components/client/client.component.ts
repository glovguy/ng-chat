import { Component, ViewChild, Output, Input, EventEmitter, ElementRef } from '@angular/core';
import { Ng2Cable, Broadcaster } from 'ng2-cable';

import { CollaborationComponent } from '../collaboration/collaboration.component';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  providers: [Ng2Cable, Broadcaster, MessageService]
})
export class ClientComponent {
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
    if (this.messageIsSending) return;
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
