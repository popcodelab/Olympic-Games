import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faTrophy} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from "@fortawesome/free-brands-svg-icons";

import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MaterialModule} from "./material.module";

/**
 * The SharedModule is a shared module that can be imported into other modules.
 * It provides common functionality and components that are required across the application.
 *
 * @NgModule annotation is used to define the module, its imports, and exports.
 * The SharedModule imports various modules and exports specific modules,
 * making them accessible for other modules that import the SharedModule.
 *
 * The SharedModule includes the following modules and components:
 *  - CommonModule: Provides common Angular directives and pipes.
 *  - RouterModule: Provides routing functionality.
 *  - FontAwesomeModule: Integrates FontAwesome icons into the application.
 *  - MatCardModule: Provides Material Design card components.
 *
 * @exports CommonModule, RouterModule, FontAwesomeModule, MatCardModule, MatToolbarModule,
 * MatButtonModule, MatIconModule, MatSnackBarModule
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    MaterialModule
  ]
})
/**
 * @author Pignon Pierre-Olivier
 *
 * @version 1.0
 */
export class SharedModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(
      faGithub,
      faTrophy,
    );
  }
}

