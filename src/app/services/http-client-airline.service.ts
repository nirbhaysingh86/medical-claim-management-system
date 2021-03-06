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
  isRecordExist: any;
  allAirlinesList: any;
  constructor(private http: HttpClient) {
    super();
    this.isRecordExist = false;
    
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

  addAirline(airline: any): Observable<Airline> {

    return this.http.post<Airline>(this.airlinesUrl, airline, cudOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteAirline(airline: number | Airline): Observable<Airline> {
    const id = typeof airline === 'number' ? airline : airline.id;
    const url = `${this.airlinesUrl}/${id}`;

    return this.http.delete<Airline>(url, cudOptions).pipe(
      catchError(this.handleError)
    );
  }

  searchAirline(providerType: string): Observable<Airline[]> {
    providerType = providerType.trim();
    // add safe, encoded search parameter if term is present
    const options = providerType ?
      { params: new HttpParams().set('name', providerType) } : {};

    return this.http.get<Airline[]>(this.airlinesUrl, options).pipe(
      catchError(this.handleError)
    );
  }

  updateAirline(airline: any): Observable<Airline> {
    return this.http.put<Airline>(this.airlinesUrl, airline, cudOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
  //Check records for create if match all parameter then it will not allow to create duplicate record.
  checkExistAirlineRecords(airlineValue: any) {
    this.allAirlinesList = JSON.parse(localStorage.getItem("airlineList") as any);
    const filterAirline = this.allAirlinesList.filter((airline: any) => {
      return airline.providerCode == (airlineValue.providerCode + airlineValue.providerCodeValue) && airline.providerName == airlineValue.providerName && airline.providerType == airlineValue.providerType
    })
    return filterAirline.length>0;
  }

  //Check records for update based on provider code
  checkExistAirlineForUpdateRecords(airlineValue: any) {
    this.allAirlinesList = JSON.parse(localStorage.getItem("airlineList") as any);
    const filterAirline = this.allAirlinesList.filter((airline: any) => {
      return airline.providerCode == (airlineValue.providerCode + airlineValue.providerCodeValue)
    })[0];
    return filterAirline.id;
  }
}
