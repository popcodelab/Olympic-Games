import { NgModule } from '@angular/core';
import { ChartsComponent}  from "./page/charts.component";
import {ChartTitleBarComponent} from "./components/chart-title-bar/chart-title-bar.component";
import {ChartTitleCardsDirective} from "./directives/chart-title-cards-directive";
import {SharedModule} from "../../shared/shared.module";
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";
import {ChartsRoutingModule} from "./charts-routing.module";

/**
 * Represents the ChartsModule class.
 * Module responsible for the charts
 * @module ChartsModule
 */
@NgModule({
  declarations: [
    ChartsComponent,
    ChartTitleBarComponent,
    ChartTitleCardsDirective
  ],
  imports: [
    SharedModule,
    CanvasJSAngularChartsModule,
    ChartsRoutingModule
  ]
})
/**
 * @author Pignon Pierre-Olivier
 *
 * @version 1.0
 */
export class ChartsModule { }
