import { Component, ViewChild, Output, Input, EventEmitter } from '@angular/core';
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
  fieldValue: string = '';

  constructor(collaboration: CollaborationComponent,
              private MessageService: MessageService,
              private ng2cable: Ng2Cable,
              private broadcaster: Broadcaster) {
  }

  sendMessage(value: string) {
    this.MessageService.createMessage(value, this.messageSuccess, null);
  }

  messageSuccess = (data) => {
    this.fieldValue = '';
  }
}
