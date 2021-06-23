import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidations, FormFields, ValidationMessages } from 'src/app/shared/custom/validations';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {
  countries: any = [{ code: "AF", name: "Afghanistan" }];

  configForm: FormGroup
  configFormField = FormFields.configForm;
  configValidationMessages = ValidationMessages.configMessages;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _customValidation: CustomValidations,
  ) {
    this.createConfigForm();
  }

  ngOnInit() {
  }


  createConfigForm() {
    this.configForm = this.fb.group({
      organizationName: ['', [Validators.required]],
      eventName: ['', [Validators.required]],
      labelName: ['', [Validators.required]],
      emailTO: [{ value: '', disabled: true }, [Validators.required]],
      emailCC: [{ value: '', disabled: true }, [Validators.required]],
      EmailSubject: [{ value: '', disabled: true }, [Validators.required]],
      emailBody: [{ value: '', disabled: true }, [Validators.required]],
      smsTO: [{ value: '', disabled: true }, [Validators.required]],
      smsBody: [{ value: '', disabled: true }, [Validators.required]],
      emailCheck: [''],
      smsCheck: ['']
    });
    this.configForm.valueChanges.subscribe((data) => {
      console.log(data.emailCheck, 'daaaaaa');


      this._customValidation.validate(data, this.configForm, this.configFormField, this.configValidationMessages)
    });
  }

  onEmailChange(e) {
    if (e === true) {
      this.configForm.get('emailTO').enable();
      this.configForm.get('emailCC').enable();
      this.configForm.get('EmailSubject').enable();
      this.configForm.get('emailBody').enable();
    } else {
      this.configForm.get('emailTO').disable();
      this.configForm.get('emailCC').disable();
      this.configForm.get('EmailSubject').disable();
      this.configForm.get('emailBody').disable();
    }
  }
  onSmsChange(e){
    if (e === true) {
      this.configForm.get('smsTO').enable();
      this.configForm.get('smsBody').enable();
    } else {
      this.configForm.get('smsTO').disable();
      this.configForm.get('smsBody').disable();
    }
  }

  saveConfiguration() {
    console.log((this.configForm.value.emailCheck))
    if (this.configForm.valid) {

    } else {
      this._customValidation.validateAllFormFields(this.configForm, this.configFormField, this.configValidationMessages);
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
    this._customValidation.clearOnRouteChange(this.configFormField);
  }

}
