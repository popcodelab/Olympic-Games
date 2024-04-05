import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appDetailsBorderCard]'
})

/**
 * Defines the Chart title card directive
 * @Author Pignon Pierre-Olivier 
 */
export class ChartTitleCardsDirective {


  /**
   * Constructs a new instance of the class.
   *
   * @param {ElementRef} elementRef - The ElementRef associated with the instance.
   * @return {void}
   */
  constructor(private elementRef: ElementRef) {
    this.setBorder('#0077b6');
    this.alignElements();
  }

  /**
   * Aligns the elements.
   *
   * @private
   * @memberof ClassName
   */
  private alignElements(){
    this.elementRef.nativeElement.style.display ='flex';
    this.elementRef.nativeElement.style.flexDirection = 'column';
    this.elementRef.nativeElement.style.alignItems = 'center';
  }

  /**
   * Sets the border color for the element.
   *
   * @param {string} color - The color of the border.
   * @private
   * @returns {void}
   */
  private setBorder(color: string): void {
    this.elementRef.nativeElement.style.border = `solid 4px ${color}`;
  }
}
