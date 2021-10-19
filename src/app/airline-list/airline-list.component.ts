import { Component } from '@angular/core';
import { HttpClientAirlineService } from '../services/http-client-airline.service';

@Component({
  selector: 'app-airline-list',
  templateUrl: './airline-list.component.html',
  styleUrls: ['./airline-list.component.scss']
})
export class AirlineListComponent {
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
