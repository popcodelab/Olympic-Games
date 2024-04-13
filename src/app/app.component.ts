import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, take} from 'rxjs';
import {DataService} from './core/services/data.service';

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

export class AppComponent implements OnInit, OnDestroy {

  /**
   * Represents a subscription.
   *
   * @type {Subscription} subscription
   */
  private subscription: Subscription | undefined;

  /**
   * Creates a new instance of the ClassName.
   *
   * @param {DataService} olympicService - The OlympicService used for accessing Olympic related data.
   *
   */
  constructor(private olympicService: DataService) {
  }

  /**
   * Lifecycle hook that is called when a component is being destroyed.
   * This method is part of the Angular component lifecycle, triggered just before the component is removed from the view.
   * It is used to perform any necessary cleanup tasks, such as unsubscribing from observable or resetting variables.
   *
   * @returns {void}
   *    This method does not return anything.
   */
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Initializes the component.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.subscription = this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  }
}
