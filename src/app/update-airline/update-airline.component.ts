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
  filterCodeAirline: any;

  airlineForm: FormGroup = new FormGroup({
    providerName: new FormControl(),
    providerCode: new FormControl(),
    providerType: new FormControl(),
    providerCodeValue: new FormControl()
  });

  constructor(private airlineService: HttpClientAirlineService, private router: Router, private fb: FormBuilder) {
    this.allAirlines = JSON.parse(localStorage.getItem("airlineList") as any);
    this.airlineForm = fb.group({
      providerName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      providerCode: [''],
      providerType: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      providerCodeValue: ['', [Validators.pattern("^[0-9]*$")]],

    })
  }

  ngOnInit() {
    this.filteredProviderNameOptions = this.airlineForm.controls.providerName.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: any): string[] {
    const filterValue = value.toLowerCase();
    return this.allAirlines.filter((option: string) => option.toLowerCase().includes(filterValue));
  }

  getProviderCode() {
    this.isProviderSelected = true;
    let gerRawData = this.airlineForm.getRawValue();
    if (gerRawData) {
      this. filterCodeAirline = this.allAirlines.filter((airline: any) => {
        return airline.providerName == gerRawData.providerName
      })

      //this.filteredProviderCodeOptions = this.airlineForm.controls.providerCode.valueChanges.pipe(
      //  startWith(''),
      //  map(value => this._filter(value))
      //);
    }
  }

  updateAirline() {
    this.isExist = false;
    let gerRawData = this.airlineForm.getRawValue();
    if (!this.airlineService.checkExistAirlineRecords(gerRawData)) {
      const airline = { providerName: gerRawData.providerName, providerCode: gerRawData.providerCode + gerRawData.providerCodeValue, providerType: gerRawData.providerType };
      this.airlineService.addAirline(airline).subscribe((data: any) => {
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
