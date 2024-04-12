import {Directive, ElementRef} from '@angular/core';

/**
 * The ChartTitleCardDirective is a directive used to set the border color and align the elements of a chart title card.
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
export class ChartTitleCardDirective {

  /**
   * Constructs a new instance of the class.
   *
   * @param {ElementRef} elementRef - The ElementRef associated with the instance.
   * @constructor
   */
  constructor(private elementRef: ElementRef) {
    this.setBorder('#04838f');
    this.alignElements();
    this.setBorderRadius(15);
    this.setHeight("4.5em");
    this.setWidth("15vw");
    this.setMargin("1em");
  }

  /**
   * Aligns the cards.
   *
   * @private
   */
  private alignElements(){
    this.elementRef.nativeElement.style.display ='flex';
    this.elementRef.nativeElement.style.flexDirection = 'column';
    this.elementRef.nativeElement.style.alignItems = 'center';
  }

  /**
   * Sets the border color for the card.
   *
   * @param {string} color - The color of the border.
   * @private
   * @returns {void}
   */
  private setBorder(color: string): void {
    this.elementRef.nativeElement.style.border = `solid 4px ${color}`;
  }

  /**
   * Sets the border radius of the card.
   *
   * @param {number} radius - The border radius value in pixels.
   * @private
   * @return {void}
   */
  private setBorderRadius(radius: number): void {
    this.elementRef.nativeElement.style.borderRadius = radius+'px';
  }

  /**
   * Sets the height of the card.
   *
   * @param {string} height - The height to set, specified as a string.
   *
   * @private
   *
   * @return {void}
   */
  private setHeight(height: string): void {
    this.elementRef.nativeElement.style.height = height;
  }

  /**
   * Sets the width of the card.
   *
   * @param {string} width - The desired width value.
   * @private
   * @return {void}
   */
  private setWidth(width: string): void {
    this.elementRef.nativeElement.style.width = width;
  }

  /**
   * Sets the margin of the card.
   *
   * @param {string} margin - The margin value to set. This should be a valid CSS margin value.
   * @private
   * @returns {void}
   */
  private setMargin(margin: string): void {
    this.elementRef.nativeElement.style.margin = margin;
  }

}
