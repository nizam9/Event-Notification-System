import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidations, FormFields, ValidationMessages } from 'src/app/shared/custom/validations';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  countries: any = [{code: "AF" , name: "Afghanistan"}];

  eventForm: FormGroup
  eventFormField = FormFields.eventForm;
  eventValidationMessages = ValidationMessages.eventMessages;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _customValidation: CustomValidations,
  ) { 
    this.createEventForm();
  }

  ngOnInit() {
  }

  createEventForm() {
    this.eventForm = this.fb.group({
      organizationName: ['', [Validators.required]],
      eventName: ['' , [Validators.required, Validators.pattern('^[a-zA-Z0-9_]*$')]]
    });
    this.eventForm.valueChanges.subscribe((data) => {
      this._customValidation.validate(data, this.eventForm, this.eventFormField, this.eventValidationMessages)
    });
  }

  createEvent() {
    if(this.eventForm.valid) {

    } else{
      this._customValidation.validateAllFormFields(this.eventForm, this.eventFormField, this.eventValidationMessages);
    }
  }

  selectedCountryAdvanced;
  filteredCountries: any[];

  filterCountry(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.countries.length; i++) {
      let country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }
  
  ngOnDestroy() {
    this._customValidation.clearOnRouteChange(this.eventFormField);
  }

}
