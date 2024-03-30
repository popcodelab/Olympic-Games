import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Olympic} from "../models/Olympic";

@Injectable({
  providedIn: 'root', // Scope : Application
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  // We use the BehaviorSubject rather a simple Observable because we need to store the current value and
  // to initialize the stream

  private olympics$:BehaviorSubject<Olympic[]> = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) { }


  /*
  Fetch the olympic data from the mock
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

  /*
  Return the olympic data as Observable
   */
  getOlympics():Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }
}
