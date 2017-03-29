import { Directive, ElementRef, Renderer, Input, OnInit } from '@angular/core';
// import { escapeStringRegexp } from '../helpers/regexHelper';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() text: string;
  @Input() search: string;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
    // if (typeof this.search === 'undefined') {
    //   this.renderer.setElementProperty(this.el.nativeElement, 'innerHTML', this.text);
    //   return;
    // }

    this.search = 'augue';
    this.renderer.setElementProperty(
      this.el.nativeElement, 
      'innerHTML', 
      this.replace(this.text, this.search));
  }

  replace(txt: string, search: string) {
    let searchRgx = new RegExp('('+search+')', 'gi');

    return txt.replace(searchRgx, `<mark>$1</mark>`);
  }

}
