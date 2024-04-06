import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

/**
 * Stores the application configuration
 * @interface
 *
 * @author Pignon Pierre-Olivier
 *
 * @version 1.0
 */
export interface ApplicationConfig {
  /**
   * Represents the application title
   *
   * @type {string}
   */
  title: string;
  /**
   * Represents the base URL for API endpoints.
   *
   * @type {string}
   */
  apiUrl: string;
  /**
   * Represents the duration, in milliseconds, for displaying error snack bar messages.
   *
   * @type {number}
   */
  errorSnackBarDuration: number;
  /**
   * Determines the horizontal position of the error snack bar.
   *
   * The valid values for this variable are:
   * 'start' | 'center' | 'end' | 'left' | 'right'
   *
   * @type {MatSnackBarHorizontalPosition}
   */
 errorSnackBarHorizontalPosition:MatSnackBarHorizontalPosition;
  /**
   * Determines the vertical position of the error snack bar.
   *
   * The valid values for this variable are:
   * 'top' | 'bottom'
   *
   * @type {MatSnackBarVerticalPosition}
   */
  errorSnackBarVerticalPosition:MatSnackBarVerticalPosition;
}
