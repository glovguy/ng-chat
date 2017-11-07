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
    let collaborationText = '';
  }

  replace(txt: string, search: string) {
    let searchRgx = new RegExp('('+search+')', 'gi');
    return txt.replace(searchRgx, `<mark>$1</mark>`);
  }
}
