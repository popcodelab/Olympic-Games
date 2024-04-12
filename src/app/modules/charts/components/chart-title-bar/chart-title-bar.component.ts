import {Component, Input} from '@angular/core';
import {SumUp} from "../../../../core/models/sum-up.model";


/**
 * Component displaying the sum up of all the participation of a given country
 *
 * Represents the title bar of a chart.
 *
 * @class ChartTitleBarComponent
 */
@Component({
  selector: 'app-chart-title-bar',
  templateUrl: './chart-title-bar.component.html',
  styleUrls: ['./chart-title-bar.component.scss']
})

/**
 * @author Pignon Pierre-Olivier
 *
 * @version 1.0
 */
export class ChartTitleBarComponent {

  /**
   * Represents the title of the chart.
   *
   * @type {string|undefined}
   */
  @Input() title: string | undefined;
  /**
   * Determines whether the element is currently visible or not.
   *
   * @type {boolean | undefined}
   */
  @Input() isAthelesCountVisible: boolean | undefined;


  /**
   * Represents a summary the totals for a country.
   *
   * @typedef {object} CountrySumUp
   * @property {string} name - The name of the country.
   * @property {number} population - The population of the country.
   * @property {string} capital - The capital city of the country.
   * @property {string[]} languages - The languages spoken in the country.
   */
  @Input() data: SumUp | undefined;

}
