import {NgModule} from '@angular/core';
import {AboutComponent} from './page/about.component';
import {SharedModule} from "../../shared/shared.module";
import {AboutRoutingModule} from "./about-routing.module";


/**
 * Represents an Angular module for the About feature.
 *
 * @module AboutModule
 */
@NgModule({
  declarations: [AboutComponent],
  imports: [
    AboutRoutingModule,
    SharedModule
  ]
})
/**
 * @author Pignon Pierre-Olivier
 *
 * @version 1.0
 */
export class AboutModule {}
