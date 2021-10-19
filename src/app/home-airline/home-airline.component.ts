import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Airline } from '../models/airline';
import { HttpClientAirlineService } from '../services/http-client-airline.service';

@Component({
  selector: 'app-home-airline',
  templateUrl: './home-airline.component.html',
  styleUrls: ['./home-airline.component.scss']
})
export class HomeAirlineComponent {
  airlines: any;
  allAirlines: any;
  collectionSize: any;
  searchProviderCode: any;

  constructor(private airlineService: HttpClientAirlineService, private router: Router) {
   
  }
  
  ngOnInit() {
    this.airlineService.getAirlines().subscribe((data: any) => {
      console.log(data);
      this.airlines = data;
      localStorage.setItem("airlineList", JSON.stringify(data));
    })
  }

  search(value: any): void {
    this.allAirlines = JSON.parse(localStorage.getItem("airlineList") as any);
    value = value.target.value;
    this.airlines = this.allAirlines.filter((val:any) => val.providerCode.toLowerCase().includes(value.toLowerCase()));
    this.collectionSize = this.airlines.length;
  }
}
