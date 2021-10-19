import { TestBed } from '@angular/core/testing';

import { HttpClientAirlineService } from './http-client-airline.service';

describe('HttpClientAirlineService', () => {
  let service: HttpClientAirlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpClientAirlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
