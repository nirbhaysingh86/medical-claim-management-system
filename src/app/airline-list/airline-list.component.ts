import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Airline } from '../models/airline';
import { HttpClientAirlineService } from '../services/http-client-airline.service';

@Component({
  selector: 'app-airline-list',
  templateUrl: './airline-list.component.html',
  styleUrls: ['./airline-list.component.scss']
})
export class AirlineListComponent {
  searchTerm: any;
  pageEvent: any;
  pageSize = 20;
  pageSizeOptions: number[] = [3, 5, 7];
  collectionSize: any;
  airlines: any[] = [];
  allAirlines: any[] = [];
  displayedColumns: string[] = ['providerCode', 'providerName', 'providerType'];
 
  @ViewChild(MatPaginator) paginator: any;
  dataSource: MatTableDataSource<Airline> = new MatTableDataSource();
  @ViewChild(MatSort, { static: false }) sort: any;

  constructor(private airlineService: HttpClientAirlineService) {
   
  }

  ngOnInit() {
    this.airlineService.getAirlines().subscribe((data: any) => {
      localStorage.setItem("airlineList", JSON.stringify(data));
      console.log(data);
      this.airlines = data;
      this.collectionSize = data.length;
      this.allAirlines = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  }
  ngAfterViewInit() {
     
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onMatSortChange() {
    this.dataSource.sort = this.sort;
  }
    
  search(value: any): void {
    value = value.target.value;
    this.airlines = this.allAirlines.filter((val) => val.providerCode.toLowerCase().includes(value));
    this.collectionSize = this.airlines.length;
  }
 
}
