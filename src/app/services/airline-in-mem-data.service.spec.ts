import { TestBed } from '@angular/core/testing';

import { AirlineInMemDataService } from './airline-in-mem-data.service';

describe('AirlineInMemDataService', () => {
  let service: AirlineInMemDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlineInMemDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
