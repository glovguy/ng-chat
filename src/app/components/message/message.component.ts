import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input('message') message: any;

  userStyle(): boolean {
    return this.message["style"]=='user'
  }

  botStyle(): boolean {
    return this.message["style"]=='bot'
  }
}
