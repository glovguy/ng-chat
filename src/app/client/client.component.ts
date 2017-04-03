import { Component, ViewChild, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { CollaborationComponent } from '../collaboration/collaboration.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
	@Input('collabMod') collabMod: CollaborationComponent;
	
  constructor(collaboration: CollaborationComponent) { }

  ngOnInit() {
  }
  thisiswhatIgot = '';

  sendMessage(value: string) { 
  	this.thisiswhatIgot = value
  	this.collabMod.addRegex(value)
  }

}
