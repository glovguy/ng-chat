import { Component, ViewChild, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Ng2Cable, Broadcaster } from 'ng2-cable/js/index';

import { CollaborationComponent } from '../collaboration/collaboration.component';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  providers: [Ng2Cable, Broadcaster, MessageService]
})
export class ClientComponent implements OnInit {
  @Input('collabMod') collabMod: CollaborationComponent;
  
  constructor(collaboration: CollaborationComponent,
              private MessageService: MessageService,
              private ng2cable: Ng2Cable,
              private broadcaster: Broadcaster) { 
  }

  ngOnInit() {
  }
  thisiswhatIgot = '';

  sendMessage(value: string) { 
    this.thisiswhatIgot = value;
    this.collabMod.addRegex(value);
    var message = {};
    message['content'] = value;
    this.MessageService.newMessage({'message': message}, this.printOut, this.printOut);
  }

  printOut = (data) => {
    console.log(data);
  }


}
