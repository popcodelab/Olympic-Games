import { Injectable } from '@angular/core';
import {ApplicationConfig} from "../models/application-config.model";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly appConfig: ApplicationConfig;

  constructor() {
    this.appConfig = {
      title: 'Olympic games results',
      apiUrl: './assets/mock/olympic.json',
    };
  }

  getAppConfig(): ApplicationConfig {
    return this.appConfig;
  }

  getTitle(): string {
    return this.appConfig.title;
  }

  getApiUrl(): string {
    return this.appConfig.apiUrl;
  }
}
