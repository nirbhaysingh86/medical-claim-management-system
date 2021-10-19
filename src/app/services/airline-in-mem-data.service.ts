 
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Airline } from '../models/airline';

@Injectable({
  providedIn: 'root'
})
export class AirlineInMemDataService implements InMemoryDbService {
  createDb() {
    let airlines: Airline[] = [
      { id: 1, providerName: 'JetAirways', providerCode: '9W-', providerType: 'Domestic' },
      { id: 2, providerName: 'Emirates', providerCode: 'EK-', providerType: 'International' },
      { id: 3, providerName: 'GoAir', providerCode: 'G8-', providerType: 'Domestic' },
      { id: 4, providerName: 'SpiceJet', providerCode: 'SG-', providerType: 'Domestic' },
      { id: 5, providerName: 'IndiGo', providerCode: '6E-', providerType: 'Domestic' },
      { id: 6, providerName: 'AirIndia', providerCode: 'AI-', providerType: 'Domestic' },
    ];
    return { airlines };
  }
}
