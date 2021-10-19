import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Airline } from '../models/airline';
import { HttpClientAirlineService } from '../services/http-client-airline.service';

@Component({
  selector: 'app-delete-airline',
  templateUrl: './delete-airline.component.html',
  styleUrls: ['./delete-airline.component.scss']
})
export class DeleteAirlineComponent {
  airlines: any;
  allAirlines: any;
  isExist: any;
  filteredProviderCodeOptions!: Observable<string[]>;
  isProviderSelected: any;
  filterCodeAirline: any[] = [];
  isDeleteButton: any;

  airlineForm: FormGroup = new FormGroup({
    providerName: new FormControl(),
    providerCode: new FormControl(),
    providerType: new FormControl(),
    providerCodeValue: new FormControl()
  });

  constructor(private airlineService: HttpClientAirlineService, private router: Router, private fb: FormBuilder) {

    this.airlineForm = fb.group({
      //providerName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      providerCode: [''],
      providerType: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      providerCodeValue: ['', [Validators.pattern("^[0-9]*$")]],

    })
  }
  //Get init values from the localstorage for the performence
  ngOnInit() {
    this.allAirlines = JSON.parse(localStorage.getItem("airlineList") as any);
    this.filteredProviderCodeOptions = this.airlineForm.controls.providerCode.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  //For auto complete
  private _filter(value: any): string[] {
    const filterValue = value.toLowerCase();
    return this.allAirlines.filter((option: string) => option.toLowerCase().includes(filterValue));
  }

  search(value: any): void {
    let gerRawData = this.airlineForm.getRawValue();
    this.isDeleteButton = true;
    this.airlines = this.allAirlines.filter((val: any) => val.providerCode.toLowerCase().includes(gerRawData.providerCode.toLowerCase()))[0];
    if (this.airlines && this.airlines.providerType && this.airlineForm.controls && this.airlineForm.controls.providerType
      && this.airlines.providerType.toLowerCase() === this.airlineForm.controls.providerType.value.toLowerCase()) {
      this.isDeleteButton = false;
    } else {

    }

  }

  //Get the existing provider code
  getProviderCode() {
    this.isProviderSelected = true;
    this.filterCodeAirline = [];
    let gerRawData = this.airlineForm.getRawValue();
    if (gerRawData) {
      this.allAirlines.filter((airline: any) => {
        if (airline.providerName.toLowerCase() == gerRawData.providerName.toLowerCase()) {
          this.filterCodeAirline.push(airline.providerCode);
        }
      })
    }
  }
  //Update airline based on provider code
  deleteAirline() {
    this.isExist = false;
    let gerRawData = this.airlineForm.getRawValue();
    let existId = this.airlineService.checkExistAirlineForUpdateRecords(gerRawData);
    if (existId) {
      this.airlineService.deleteAirline(existId).subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/home']);
      })
    } else {
      this.isExist = true;
    }
  }

  get f() {
    return this.airlineForm.controls;
  }
}
