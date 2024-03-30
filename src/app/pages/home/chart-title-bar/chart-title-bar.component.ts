import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-chart-title-bar',
  templateUrl: './chart-title-bar.component.html',
})
export class ChartTitleBarComponent {
  @Input() title: any;
  @Input() isVisible: any;
  @Input() data: any;
  constructor() { }

}
