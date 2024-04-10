import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../../core/services/config.service";

/**
 * Represents the AboutComponent class.
 *
 * This component is responsible for displaying information about the application, including the GitHub repository URL.
 */
@Component({
  selector: 'app-page',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  /**
   * Represents the title of the application.
   *
   * @type {string}
   */
  applicationTitle: string = '';

  /**
   * The version of the application.
   *
   * @type {string}
   */
  applicationVersion: string = '';

  /**
   * The URL of the GitHub repository.
   *
   * @name gitHubRepoUrl
   * @type {string}
   */
  gitHubRepoUrl: string = '';

  /**
   * Creates a new instance of the constructor.
   *
   * @param {ConfigService} configService - The config service used for configuration.
   */
  constructor(private configService: ConfigService) {
  }

  /**
   * Initializes the component.
   * Retrieves GitHub repository URL, application title and version using the injected ConfigService
   *
   * @return {void} This method does not return anything.
   */
  ngOnInit(): void {
    this.gitHubRepoUrl = this.configService.getGitHubRepoUrl();
    this.applicationTitle = this.configService.getApplicationTitle();
    this.applicationVersion = this.configService.getApplicationVersion();
  }

}
