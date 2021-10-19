import { Component } from '@angular/core';
import { Airline } from '../models/airline';
import { HttpClientAirlineService } from '../services/http-client-airline.service';

@Component({
  selector: 'app-create-airline',
  templateUrl: './create-airline.component.html',
  styleUrls: ['./create-airline.component.scss']
})
export class CreateAirlineComponent {
  airlines: any[] = [];
  allAirlines: any[] = [];

  constructor(private airlineService: HttpClientAirlineService) {
   
  }
  
  ngOnInit() {
    
  }

  createAirline() {
    const airline = { providerName:'Bistara', providerCode:'BS', providerType:'Domestic' };
    this.airlineService.addAirline(airline).subscribe((data: any) => {
      console.log(data);
      this.airlines = data;

      this.allAirlines = data;

    })
  }
}
