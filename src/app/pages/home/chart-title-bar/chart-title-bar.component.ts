import {Component, Input} from '@angular/core';
import {CountrySumUp} from "../../../core/models/country-sum-up.model";

@Component({
  selector: 'app-chart-title-bar',
  templateUrl: './chart-title-bar.component.html',
})
export class ChartTitleBarComponent {
  /** @Type {string} : Chart title */
  @Input() title: string | undefined;
  /** @Type {boolean} : Shows or hides participation details of the selected country */
  @Input() isVisible: boolean | undefined;
  /** @Type {CountrySumUp} : Totals from parent component */
  @Input() data: CountrySumUp | undefined;

}
