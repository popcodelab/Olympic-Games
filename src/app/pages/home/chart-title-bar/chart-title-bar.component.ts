import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-chart-title-bar',
  templateUrl: './chart-title-bar.component.html',
})
export class ChartTitleBarComponent {
  /** @Type {any} : Chart title */
  @Input() title: any;
  /** @Type {boolean} : Shows or hides participation details of the selected country */
  @Input() isVisible: any;
  /** @Type {any} : Totals from parent component */
  @Input() data: any;

}
