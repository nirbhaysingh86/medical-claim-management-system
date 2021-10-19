import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Airline } from '../models/airline';
import { HttpClientAirlineService } from '../services/http-client-airline.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-airline',
  templateUrl: './create-airline.component.html',
  styleUrls: ['./create-airline.component.scss']
})
export class CreateAirlineComponent {
  airlines: any;
  allAirlines: any;
  collectionSize: any;
  providerName: any;
  providerCode: any;
  providerType: any;
  providerCodeValue: any;
  airlineForm: FormGroup = new FormGroup({
    providerName: new FormControl(),
    providerCode: new FormControl(),
    providerType: new FormControl(),
    providerCodeValue: new FormControl()
  });

  constructor(private airlineService: HttpClientAirlineService, private router: Router, private fb: FormBuilder) {
     
    this.airlineForm = fb.group({
      providerName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      providerCode: ['' ],
      providerType: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      providerCodeValue: ['', [Validators.pattern("^[0-9]*$")]],

    })
  }
  
  ngOnInit() {
    
  }

  search(value: any): void {
    this.allAirlines = JSON.parse(localStorage.getItem("airlineList") as any);
    value = value.target.value;
    this.airlines = this.allAirlines.filter((val: any) => val.providerName.toLowerCase().includes(value.toLowerCase()))[0];
    if (this.airlines && this.airlines.providerCode && this.airlineForm.controls && this.airlineForm.controls.providerCode) {
      this.airlineForm.controls.providerCode.setValue(this.airlines.providerCode) ;
    } else {
      this.providerCode = null;
    }
     
  }

  createAirline() {
    const airline = { providerName: this.providerName, providerCode: this.providerCode, providerType: this.providerType };
    this.airlineService.addAirline(airline).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/home']);
    })
  }
    
  get f() {
    return this.airlineForm.controls;
  }

  //submit() {
  //  console.log(this.form.value);
  //}
}
