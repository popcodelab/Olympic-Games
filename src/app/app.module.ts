import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {ContentLayoutComponent} from './layout/content-layout/content-layout.component';
import {CoreModule} from "./core/core.module";
import {FooterComponent} from './layout/footer/footer.component';
import {HeaderComponent} from './layout/header/header.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


/**
 * The AppModule is the root module of the application.
 * It contains declarations, imports, providers, and bootstrap configurations.
 *
 * @NgModule is a decorator function that defines the metadata for the module.
 * It includes declarations, imports, providers, and bootstrap.
 *
 * @declarations specify the components, directives, and pipes that belong to this module.
 *
 * @imports specify other modules that are imported into this module.
 * These modules provide additional functionality and can be shared across multiple modules.
 * Here, Angular modules like BrowserModule, CoreModule, SharedModule, and AppRoutingModule are imported.
 *
 * @providers specify the services and providers that are available for injection in this module.
 * This module does not have any provider declarations at the moment.
 *
 * @bootstrap specify which component will act as the root component.
 * Here, AppComponent is set as the root component.
 */
@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    // angular
    BrowserModule,
    //Provides animations support for Angular Material components as Snackbar.
    BrowserAnimationsModule, // Must be placed in the same Module as BrowserModule, otherwise navigation KO

    // core & shared
    CoreModule,
    SharedModule,

    // app
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
/**
 * @author Pignon Pierre-Olivier
 *
 * @version 1.0
 */
export class AppModule {
}
