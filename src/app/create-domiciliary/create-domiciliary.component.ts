import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Airline } from '../models/airline';
import { HttpClientAirlineService } from '../services/http-client-airline.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-domiciliary',
  templateUrl: './create-domiciliary.component.html',
  styleUrls: ['./create-domiciliary.component.scss']
})
export class CreateDomiciliaryComponent {
  airlines: any;
  allAirlines: any;
  isExist: any;

  airlineForm: FormGroup = new FormGroup({
    providerName: new FormControl(),
    providerCode: new FormControl(),
    providerType: new FormControl(),
    providerCodeValue: new FormControl()
  });

  constructor(private airlineService: HttpClientAirlineService, private router: Router, private fb: FormBuilder) {
     
    this.airlineForm = fb.group({
      providerName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      providerCode: ['', ],
      providerType: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      providerCodeValue: ['', [Validators.pattern("^[0-9]*$")]],

    })
  }
  
  ngOnInit() {
    this.allAirlines = JSON.parse(localStorage.getItem("airlineList") as any);
  }
  //Searching provider name and based on name defaulting code
  search(value: any): void {
    value = value.target.value;
    this.airlines = this.allAirlines.filter((val: any) => val.providerName.toLowerCase().includes(value.toLowerCase()))[0];
    if (this.airlines && this.airlines.providerCode && this.airlineForm.controls && this.airlineForm.controls.providerCode) {
      this.airlineForm.controls.providerCode.setValue(this.airlines.providerCode) ;
    } else {
      this.airlineForm.controls.providerCode.setValue(null);;
    }
     
  }
  //Create a new airline
  createAirline() {
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
   //Get the error validation from the reactive form control
  get f() {
    return this.airlineForm.controls;
  }
}
