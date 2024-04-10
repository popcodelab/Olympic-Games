import {Directive, ElementRef} from '@angular/core';

/**
 * The ChartTitleCardsDirective is a directive used to set the border color and align the elements of a chart title card.
 *
 * @example
 *   <div appDetailsBorderCard></div>
 *
*/
@Directive({
  selector: '[appDetailsBorderCard]'
})

 /**
 * @author Pignon Pierre-Olivier
 *
 * @version 1.0
 */
export class ChartTitleCardsDirective {

  /**
   * Constructs a new instance of the class.
   *
   * @param {ElementRef} elementRef - The ElementRef associated with the instance.
   * @constructor
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
