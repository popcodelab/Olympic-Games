import { NgModule } from '@angular/core';
import {AboutComponent} from "./page/about.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: AboutComponent
  }
];

/**
 * The `AboutRoutingModule` class is responsible for defining and configuring the routing for the
 * About feature module. It imports the necessary routing module and exports it for use by other
 * modules.
 *
 * @NgModule decorator is used to define the `AboutRoutingModule` as an NgModule, specifying the
 * imported routing module and exported RouterModule.
 *
 * @remarks
 * This class is part of the About feature module and should be imported and added to the import
 * array of the AppModule or any other module that requires the About feature.
 *
 * @example
 * ```
 * // Import the AboutRoutingModule in AppModule or any other module that needs the About feature.
 * import { AboutRoutingModule } from './about-routing.module';
 *
 * @NgModule({
 *   imports: [AboutRoutingModule],
 *   exports: [RouterModule]
 * })
 * export class AppModule { }
 * ```
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
export class AboutRoutingModule { }

