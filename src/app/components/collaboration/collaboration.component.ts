import { Component, OnInit } from '@angular/core';
import { rawText } from './constants';

@Component({
  selector: 'app-collaboration',
  templateUrl: './collaboration.component.html',
  styleUrls: ['./collaboration.component.css']
})

export class CollaborationComponent implements OnInit {
  collaborationText: string;

  ngOnInit() {
    this.collaborationText = '<span class="glyphicon glyphicon-info-sign"></span> Sandwich bot is here for all of your sandwich identification needs.<br /> Just send it the name of a food item, and it will tell you if it is a sandwich or not.';
  }

  replace(txt: string, search: string) {
    let searchRgx = new RegExp('('+search+')', 'gi');
    return txt.replace(searchRgx, `<mark>$1</mark>`);
  }
}
