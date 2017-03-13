import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-river',
  templateUrl: './message-river.component.html',
  styleUrls: ['./message-river.component.scss']
})
export class MessageRiverComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  messages = [ 
    {text: 'hey there really long message here lorem ipsum soles i dont know omre but here it is', sender: 'You', style: 'user'}, 
    {text: 'second message', sender: 'NLP bot', style: 'bot'} 
  ];

  state = "statement";

}
