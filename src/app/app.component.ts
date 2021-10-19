import { Component, OnInit } from '@angular/core';
import { AirlineService } from './services/airline.service';
import { HttpClientAirlineService } from './services/http-client-airline.service';
 @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'airline-management';
  airlines: any[] = [];
   constructor(private airlineService: HttpClientAirlineService) {

  }

  ngOnInit() {
    this.airlineService.getAirlines().subscribe((data: any) => {
      console.log(data);
      this.airlines = data;
    })
  }
}
