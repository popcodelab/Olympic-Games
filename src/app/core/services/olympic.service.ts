import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Olympic} from "../models/olympic.model";
import {ConfigService} from "./config.service";

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
   * @Type {olympics$:BehaviorSubject<Olympic[]>} : data
   * @private
   */
  private olympics$:BehaviorSubject<Olympic[]> = new BehaviorSubject<Olympic[]>([]);

  /**
   * Constructs a new instance of the class.
   *
   * @param {HttpClient} http - The HttpClient service.
   * @param {ConfigService} appConfigService - The ConfigService service.
   */
  constructor(
    private http: HttpClient,
    private appConfigService: ConfigService) {
    this.olympicUrl = this.appConfigService.getApiUrl();
  }

  /**
   * Loads initial data from the Olympic API from the mock JSON file.
   *
   * @returns An Observable that emits the response from the API call.
   *          If an error occurs, it emits an error message and propagates the error.
   */
  loadInitialData(): Observable<any> {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error:any ) => {
        console.error(error);
        // Set BehaviorSubject to null to indicate an error
        this.olympics$.next(null!);
        // Return throwError using errorFactory to propagate the error
        return throwError(() => new error('An error has occurred fetching the data. Please try again later.',error));
      })
    );
  }

  /**
   * Returns an Observable that emits an array of Olympic objects.
   *
   * @returns {Observable<Olympic[]>} - An Observable that emits an array of Olympic objects.
   */
  getOlympics():Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }
}
