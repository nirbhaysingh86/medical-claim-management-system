import { Injectable } from '@angular/core';
import { Airline } from '../models/airline';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
 
export abstract class AirlineService {
  airlinesUrl = 'api/airlines';

  abstract getAirlines(): Observable<Airline[]>;
  abstract getAirline(id: number): Observable<Airline>;
  abstract addAirline(providerName: string, providerCode: string, providerType:string): Observable<Airline>;
  abstract deleteAirline(airline: Airline | number): Observable<Airline>;
  abstract searchAirline(providerType: string): Observable<Airline[]>;
  abstract updateAirline(airline: Airline): Observable<Airline>;

}
