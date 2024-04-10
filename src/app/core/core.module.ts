import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";


@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule
  ]
})
/**
 * The CoreModule class is responsible for managing the core functionality of the application.
 *
 * @module CoreModule
 * @class
 */
export class CoreModule { }
