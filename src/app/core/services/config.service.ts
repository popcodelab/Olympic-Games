import {Injectable} from '@angular/core';
import {ApplicationConfig} from "../models/application-config.model";
import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})

/**
 * Application configuration service
 *
 * @Author Pignon Pierre-Olivier
 */
export class ConfigService {

  /** @Type {ApplicationConfig} application configuration*/
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
