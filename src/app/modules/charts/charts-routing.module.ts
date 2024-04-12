import {NgModule} from '@angular/core';
import {ChartsComponent} from "./page/charts.component";
import {RouterModule, Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: 'charts',
    component: ChartsComponent
  }
];

/**
 * The ChartsRoutingModule class is responsible for configuring the routing
 * for the Charts module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
/**
 * @author Pignon Pierre-Olivier
 *
 * @version 1.0
 */
export class ChartsRoutingModule { }
