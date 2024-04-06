import {Component, OnInit} from '@angular/core';
import {take} from 'rxjs';
import {OlympicService} from './core/services/olympic.service';
import {ConfigService} from "./core/services/config.service";

/**
 * AppComponent class represents the root component of the application.
 * It initializes the component and handles application configuration and Olympic data.
 * @class
 *
 * @author Pignon Pierre-Olivier
 * @version 1.0
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {

  /**
   * @typedef {string} applicationTitle
   *
   * @description
   * The application title is a string that represents the title of the application.
   * It can be used to display the title in the user interface or as a reference in the code.
   *
   * @example
   * let myAppTitle = 'My App';
   */
  applicationTitle: string = '';

  /**
   * Creates a new instance of the ClassName.
   *
   * @param {ConfigService} appConfigService - The ConfigService used for accessing application configuration.
   * @param {OlympicService} olympicService - The OlympicService used for accessing Olympic related data.
   *
   */
  constructor(
    private appConfigService: ConfigService,
    private olympicService: OlympicService) {
  }

  /**
   * Initializes the component.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.applicationTitle = this.appConfigService.getTitle();
    this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  }
}
