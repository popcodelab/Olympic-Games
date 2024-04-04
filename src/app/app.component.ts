import {Component, OnInit} from '@angular/core';
import {take} from 'rxjs';
import {OlympicService} from './core/services/olympic.service';
import {ConfigService} from "./core/services/config.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

/**
 * @Author Pignon Pierre-Olivier
 */
export class AppComponent implements OnInit {

  /** @Type {string}  */
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
