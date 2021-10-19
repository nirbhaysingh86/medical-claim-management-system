import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Airline } from '../models/airline';
import { AirlineService } from './airline.service';
const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
@Injectable({
  providedIn: 'root'
})
 
export class HttpClientAirlineService extends AirlineService {

  constructor(private http: HttpClient) {
    super();
  }

  getAirlines(): Observable<Airline[]> {
    return this.http.get<Airline[]>(this.airlinesUrl).pipe(
      catchError(this.handleError)
    );
  }

  // get by id - will 404 when id not found
  getAirline(id: number): Observable<Airline> {
    const url = `${this.airlinesUrl}/${id}`;
    return this.http.get<Airline>(url).pipe(
      catchError(this.handleError)
    );
  }

  addAirline(providerName: string, providerCode: string, providerType:string): Observable<Airline> {
    const airline = { providerName, providerCode, providerType };
    return this.http.post<Airline>(this.airlinesUrl, airline, cudOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteAirline(villain: number | Airline): Observable<Airline> {
    const id = typeof villain === 'number' ? villain : villain.id;
    const url = `${this.airlinesUrl}/${id}`;

    return this.http.delete<Airline>(url, cudOptions).pipe(
      catchError(this.handleError)
    );
  }

  searchAirline(term: string): Observable<Airline[]> {
    term = term.trim();
    // add safe, encoded search parameter if term is present
    const options = term ?
      { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Airline[]>(this.airlinesUrl, options).pipe(
      catchError(this.handleError)
    );
  }

  updateAirline(villain: Airline): Observable<Airline> {
    return this.http.put<Airline>(this.airlinesUrl, villain, cudOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

}
