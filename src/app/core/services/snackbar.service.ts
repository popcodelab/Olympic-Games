import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfigService} from "./config.service";

/**
 * Service for displaying snackbars.
 *
 * @remarks
 * This service provides methods for opening snackbars with different types of messages.
 *
 * @category Service
 */
@Injectable({
  providedIn: 'root'
})
/**
 * @author Pignon Pierre-Olivier
 *
 * @version 1.0
 */
export class SnackBarService {

  /**
   * Creates a new instance of the constructor.
   *
   * @param {MatSnackBar} snackBar - The MatSnackBar for displaying snack bar messages.
   * @param {ConfigService} configService - The ConfigService for accessing configuration data.
   */
  constructor(
    private snackBar:MatSnackBar,
    private configService: ConfigService) { }

  /**
   * Opens an error snackbar with the given message.
   *
   * @param {string} message - The error message to display in the snackbar.
   *
   * @param {string} action : Action that the user could do
   * @param {string]} cssClass : CSS class to apply
   * @private
   *
   * @returns {void} - This method does not return a value.
   */
  openSnackBar(message: string, action:string ='Close', cssClass: string='\'error-snackbar\''): void {
    this.snackBar.open(message, action, {
      duration: this.configService.getErrorSnackBarDuration(),
      horizontalPosition: this.configService.getErrorSnackBarHorizontalPosition(),
      verticalPosition: this.configService.getErrorSnackBarVerticalPosition(),
      panelClass: [cssClass]
    });
  }
}
