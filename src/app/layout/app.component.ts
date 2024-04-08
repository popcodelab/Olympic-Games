import {Component, OnInit} from '@angular/core';
import {take} from 'rxjs';
import {OlympicService} from '../core/services/olympic.service';
import {ConfigService} from "../core/services/config.service";

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
   * Creates a new instance of the ClassName.
   *
   * @param {OlympicService} olympicService - The OlympicService used for accessing Olympic related data.
   *
   */
  constructor(private olympicService: OlympicService) {
  }

  /**
   * Initializes the component.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  }
}
