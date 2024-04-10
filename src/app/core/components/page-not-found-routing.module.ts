import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

export const routes: Routes = [
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

/**
 * Module responsible for the error page routing
 *
 * @author Pignon Pierre-Olivier
 *
 * @version 1.0
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
