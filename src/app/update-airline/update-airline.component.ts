import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Airline } from '../models/airline';
import { HttpClientAirlineService } from '../services/http-client-airline.service';

@Component({
  selector: 'app-update-airline',
  templateUrl: './update-airline.component.html',
  styleUrls: ['./update-airline.component.scss']
})
export class UpdateAirlineComponent {
  airlines: any;
  allAirlines: any;
  providerName: any;
  providerCode: any;
  providerType: any;

  constructor(private airlineService: HttpClientAirlineService, private router: Router) {
   
  }
  
  ngOnInit() {
    
  }

  search(value: any): void {
    this.allAirlines = JSON.parse(localStorage.getItem("airlineList") as any);
    value = value.target.value;
    this.airlines = this.allAirlines.filter((val: any) => val.providerName.toLowerCase().includes(value.toLowerCase()))[0];
    if (this.airlines && this.airlines.providerCode) {
      this.providerCode = this.airlines.providerCode;
    } else {
      this.providerCode = null;
    }
     
  }

  updateAirline() {
    const airline = { providerName: this.providerName, providerCode: this.providerCode, providerType: this.providerType };
    this.airlineService.addAirline(airline).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/home']);
    })
  }
}
