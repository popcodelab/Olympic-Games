import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './layout/app.component';
import { HomeComponent } from './modules/home/page/home.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {AsyncPipe} from "@angular/common";
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import { ChartTitleBarComponent } from './modules/home/components/chart-title-bar/chart-title-bar.component';
import { ChartTitleCardsDirective } from './modules/home/directives/chart-title-cards-directive';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    ChartTitleBarComponent,
    ChartTitleCardsDirective,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    AsyncPipe,
    CanvasJSAngularChartsModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  /**
   * Constructor for initializing an instance of a class.
   *
   * @param {MatIconRegistry} matIconRegistry - The MatIconRegistry service used to register custom icons.
   * @param {DomSanitizer} domSanitizer - The DomSanitizer service used to sanitize and trust the icon resource URL.
   *
   * Note: Register the rewarded_ads Google icon with Angular Material, this is crucial to locate the SVG file
   *
   */
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'rewarded_ads',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/rewarded_ads.svg')
    );
  }


}
