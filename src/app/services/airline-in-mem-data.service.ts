 
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Airline } from '../classes/airline';

@Injectable({
  providedIn: 'root'
})
export class AirlineInMemDataService implements InMemoryDbService {
  createDb() {
    let airlines: Airline[] = [
      { id: 1, providerName: 'Jet Airways', providerCode: '9W', providerType: 'Domestic' },
      { id: 2, providerName: 'Emirates', providerCode: 'EK', providerType: 'International' },
      { id: 4, providerName: 'Go Air', providerCode: 'G8', providerType: 'Domestic' },
      { id: 3, providerName: 'SpiceJet', providerCode: 'SG', providerType: 'Domestic' },
    ];
    return { airlines };
  }
}
