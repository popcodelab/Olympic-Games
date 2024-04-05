import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

/**
 * Store the appllication configuration
 * @Interface
 *
 * @Author Pierre-Olivier Pignon
 */
export interface ApplicationConfig {
  /** @Type {string} Application title */
  title: string;
  /** @Type {string} url used by the OlympicService to collect the data */
  apiUrl: string;
  /**
   * The duration, in milliseconds, for displaying error snack bar messages.
   *
   * @type {number}
   */
  errorSnackBarDuration: number;
  /**
   * The horizontal position of the error snack bar.
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
