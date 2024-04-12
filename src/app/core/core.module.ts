import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [PageNotFoundComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        SharedModule,
        MatTooltipModule
    ]
})
/**
 * The CoreModule class is responsible for managing the core functionality of the application.
 *
 * @module CoreModule
 * @class
 */
export class CoreModule { }
