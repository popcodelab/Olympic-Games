import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Country} from "../models/country.model";
import {ConfigService} from "./config.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root', // Scope : Application
})

/**
 * Provides the Olympic Games data for the application using a JSON file
 *
 * @Author Pignon Pierre-Olivier
 */
export class OlympicService {
  /** @Type {string} JSON file url */
  private olympicUrl: string = '';
  /**
   * We use the BehaviorSubject rather a simple Observable because we need to store the current value and to initialize the stream
   *
   * @Type {olympics$:BehaviorSubject<Country[]>} : data
   * @private
   */
  private olympics$: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);

  /**
   * Constructs a new instance of the class.
   *
   * @param {HttpClient} http - The HttpClient service.
   * @param {ConfigService} appConfigService - The ConfigService service.
   * @param snackBar
   */
  constructor(
    private http: HttpClient,
    private appConfigService: ConfigService,
    private snackBar: MatSnackBar
  ) {
    this.olympicUrl = this.appConfigService.getApiUrl();
  }

  /**
   * Loads initial data from the Olympic API from the mock JSON file.
   *
   * @returns An Observable that emits the response from the API call.
   *          If an error occurs, it emits an error message and propagates the error.
   */
  loadInitialData(): Observable<Country[]> {
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((value: Country[]) => this.olympics$.next(value)),
      catchError((error: Error) => {
        console.error(error);
        this.olympics$.next([]);
        this.openErrorSnackBar(error.message);
        return throwError(() => error);
      })
    );
  }

  /**
   * Returns an Observable that emits an array of Olympic objects.
   *
   * @returns {Observable<Country[]>} - An Observable that emits an array of Olympic objects.
   */
  getOlympics(): Observable<Country[]> {
    return this.olympics$.asObservable();
  }

  /**
   * Opens an error snackbar with the given message.
   *
   * @param {string} message - The error message to be displayed.
   * @private
   * @returns {void}
   */
  private openErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: this.appConfigService.getErrorSnackBarDuration(), // Adjust duration as needed
      horizontalPosition: this.appConfigService.getErrorSnackBarHorizontalPosition(),
      verticalPosition: this.appConfigService.getErrorSnackBarVerticalPosition(),
      panelClass: ['error-snackbar']
    });
  }
}
