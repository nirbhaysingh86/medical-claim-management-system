import { Component } from '@angular/core';
import { HttpClientAirlineService } from '../services/http-client-airline.service';

@Component({
  selector: 'app-airline-list',
  templateUrl: './airline-list.component.html',
  styleUrls: ['./airline-list.component.scss']
})
export class AirlineListComponent {
  searchTerm: any;
  page = 1;
  pageSize = 4;
  collectionSize: any;
  airlines: any[] = [];
  allAirlines: any[] = [];
  constructor(private airlineService: HttpClientAirlineService) {

  }
  ngOnInit() {
    this.airlineService.getAirlines().subscribe((data: any) => {
      console.log(data);
      this.airlines = data;
      this.collectionSize = data.length;
      this.allAirlines = data;
    })
  }
  search(value: any): void {
    value = value.target.value;
    this.airlines = this.allAirlines.filter((val) => val.providerCode.toLowerCase().includes(value));
    this.collectionSize = this.airlines.length;
  }
 
}
