import {NgModule} from '@angular/core';
import {ChartsComponent} from "./page/charts.component";
import {ChartTitleBarComponent} from "./components/chart-title-bar/chart-title-bar.component";
import {ChartTitleCardDirective} from "./directives/chart-title-card.directive";
import {SharedModule} from "../../shared/shared.module";
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";
import {ChartsRoutingModule} from "./charts-routing.module";
import {MatTooltipModule} from "@angular/material/tooltip";

/**
 * Represents the ChartsModule class.
 * Module responsible for the charts
 * @module ChartsModule
 */
@NgModule({
  declarations: [
    ChartsComponent,
    ChartTitleBarComponent,
    ChartTitleCardDirective
  ],
    imports: [
        SharedModule,
        CanvasJSAngularChartsModule,
        ChartsRoutingModule,
        MatTooltipModule
    ]
})
/**
 * @author Pignon Pierre-Olivier
 *
 * @version 1.0
 */
export class ChartsModule { }
