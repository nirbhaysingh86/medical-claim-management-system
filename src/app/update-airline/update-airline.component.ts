import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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
  isExist: any;
  filteredProviderNameOptions!: Observable<string[]>;
  filteredProviderCodeOptions!: Observable<string[]>;
  isProviderSelected: any;
  filterCodeAirline: any[] = [];
  isUpdateButton: any;

  airlineForm: FormGroup = new FormGroup({
    providerName: new FormControl(),
    providerCode: new FormControl(),
    providerType: new FormControl(),
    providerCodeValue: new FormControl()
  });

  constructor(private airlineService: HttpClientAirlineService, private router: Router, private fb: FormBuilder) {
   
    this.airlineForm = fb.group({
      providerName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      providerCode: [''],
      providerType: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      providerCodeValue: ['', [Validators.pattern("^[0-9]*$")]],

    })
  }
  //Get init values from the localstorage for the performence
  ngOnInit() {
    this.allAirlines = JSON.parse(localStorage.getItem("airlineList") as any);
    this.filteredProviderNameOptions = this.airlineForm.controls.providerName.valueChanges.pipe(
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
    value = value.target.value;
    this.isUpdateButton = true;
    this.airlines = this.allAirlines.filter((val: any) => val.providerType.toLowerCase().includes(value.toLowerCase()))[0];
    if (this.airlines && this.airlines.providerType && this.airlineForm.controls && this.airlineForm.controls.providerType
      && this.airlines.providerType.toLowerCase() === this.airlineForm.controls.providerType.value.toLowerCase()) {
      this.isUpdateButton = false;
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
  updateAirline() {
    this.isExist = false;
    let gerRawData = this.airlineForm.getRawValue();
    let existId = this.airlineService.checkExistAirlineForUpdateRecords(gerRawData);
    if (existId) {
      const airline = { id: existId, providerName: gerRawData.providerName, providerCode: gerRawData.providerCode + gerRawData.providerCodeValue, providerType: gerRawData.providerType };
      this.airlineService.updateAirline(airline).subscribe((data: any) => {
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
