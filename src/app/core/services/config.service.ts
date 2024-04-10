import {Injectable} from '@angular/core';
import {ApplicationConfig} from "../models/application-config.model";
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {environment} from "../../../environments/environment";

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
   * @constructor
   */
  constructor() {
    this.appConfig = {
      applicationTitle: 'Olympic games results',
      apiUrl: './assets/mock/olympic.json',
      gitHubRepoUrl: 'https://github.com/popcodelab/Olympic-Games',
      pieSliceResetTimerTime: 500,
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
  getApplicationTitle(): string {
    return this.appConfig.applicationTitle;
  }

  /**
   * Retrieves the API URL from the appConfig object.
   *
   * @returns {string} The API URL.
   */
  getApiUrl = (): string => this.appConfig.apiUrl;


  /**
   * Retrieves the URL of the GitHub repository hosting the application.
   *
   * @returns {string} The URL of the GitHub repository.
   */
  getGitHubRepoUrl(): string {
    return this.appConfig.gitHubRepoUrl;
  }

  /**
   * Retrieves the pie slice reset timer time.
   *
   * @returns {number} The pie slice reset timer time.
   */
  getPieSliceResetTimerTime(): number {
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

  /**
   * Retrieves the version of the application.
   *
   * @return {string} The version of the application.
   */
  getApplicationVersion = (): string => environment.version;
}
