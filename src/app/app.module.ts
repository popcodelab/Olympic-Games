import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {AsyncPipe} from "@angular/common";
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
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
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  /*
  * Register the remarded_ads Google icon with Angular Material, this is crucial to locate the SVVG file
  * */
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