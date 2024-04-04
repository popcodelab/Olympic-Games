import { Injectable } from '@angular/core';
import {ApplicationConfig} from "../models/application-config.model";

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
}
