import {Injectable} from '@angular/core';
import {ApplicationConfig} from "../models/application-config.model";
import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

/**
 * Service providing functionality for the application.
 * This service is provided in the root injector, making it accessible application-wide.
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Configuration service for the application.
 *
 * @author Pignon Pierre-Olivier
 *
 * @version 1.0
 */
export class ConfigService {

  /**
   * Represents the configuration for an application.
   *
   * @typedef {Object} ApplicationConfig
   */
  private readonly appConfig: ApplicationConfig;

  /**
   * Constructs a new instance of the class.
   * Initializes the app configuration object with default values.
   *
   * @constructor
   */
  constructor() {
    this.appConfig = {
      title: 'Olympic games results',
      apiUrl: './assets/mock/olympic.json',
      pieSliceResetTimerTime: 350,
      errorSnackBarDuration: 5000,
      errorSnackBarHorizontalPosition: 'center',
      errorSnackBarVerticalPosition: 'bottom'
    };
  }

  /**
   * Returns the title of the application.
   *
   * @return {string} The title of the application.
   */
  getTitle(): string {
    return this.appConfig.title;
  }

  /**
   * Retrieves the API URL from the appConfig object.
   *
   * @returns {string} The API URL.
   */
  getApiUrl(): string {
    return this.appConfig.apiUrl;
  }

  /**
   * Retrieves the pie slice reset timer time.
   *
   * @returns {number} The pie slice reset timer time.
   */
  getPieSliceResetTimerTime(): number{
    return this.appConfig.pieSliceResetTimerTime;
  }

  /**
   * Retrieves the duration of the error snackbar.
   *
   * @returns {number} The duration of the error snackbar in milliseconds.
   */
  getErrorSnackBarDuration(): number {
    return this.appConfig.errorSnackBarDuration;
  }

  /**
   * Retrieves the horizontal position of the error snackbar.
   *
   * @returns {string} The horizontal position of the error snackbar.
   */
  getErrorSnackBarHorizontalPosition(): MatSnackBarHorizontalPosition {
    return this.appConfig.errorSnackBarHorizontalPosition;
  }

  /**
   * Get the vertical position of the error snackbar.
   *
   * @returns {string} The vertical position of the error snackbar.
   */
  getErrorSnackBarVerticalPosition(): MatSnackBarVerticalPosition {
    return this.appConfig.errorSnackBarVerticalPosition;
  }
}
