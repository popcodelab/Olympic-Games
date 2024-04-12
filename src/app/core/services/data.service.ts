import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Country} from "../models/country.model";
import {ConfigService} from "./config.service";
import {SnackBarService} from "./snackbar.service";

/**
 * Service providing functionality for the application.
 * This service is provided in the root injector, making it accessible application-wide.
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Provides the Olympic Games data for the application using a JSON file
 *
 * @author Pignon Pierre-Olivier
 *
 * @version 1.0
 */
export class DataService {

  /**
   * The URL of the Olympic Games Json file.
   *
   * @type {string}
   */
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
   * @param {SnackBarService} snackBarService - The service to use Material SnackBar
   */
  constructor(
    private http: HttpClient,
    private appConfigService: ConfigService,
    private snackBarService: SnackBarService
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
        this.snackBarService.openSnackBar(error.message);
        return throwError(() => error);
      })
    );
  }

  /**
   * Returns an Observable that emits an array of Olympic objects.
   *
   * @returns {Observable<Country[]>} - An Observable that emits an array of Olympic objects.
   */
  getOlympics = (): Observable<Country[]> => this.olympics$.asObservable();

}
