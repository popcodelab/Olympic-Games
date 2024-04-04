import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appDetailsBorderCard]'
})
export class ChartTitleCardsDirective {

  constructor(private el: ElementRef) {
    this.setBorder('#0077b6');
    this.alignElements();
  }
  private alignElements(){
    this.el.nativeElement.style.display ='flex';
    this.el.nativeElement.style.flexDirection = 'column';
    this.el.nativeElement.style.alignItems = 'center';
  }

  private setBorder(color: string){
    this.el.nativeElement.style.border = `solid 4px ${color}`;
  }
}
