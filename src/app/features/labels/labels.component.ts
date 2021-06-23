import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidations, FormFields, ValidationMessages } from 'src/app/shared/custom/validations';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {
  
  labelForm: FormGroup
  labelFormField = FormFields.labelForm;
  labelValidationMessages = ValidationMessages.labelMessages;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _customValidation: CustomValidations,
  ) { 
    this.createLabelForm();
  }


  ngOnInit() {
  }

  createLabelForm() {
    this.labelForm = this.fb.group({
      labelName: ['' , [Validators.required, Validators.pattern('^[a-zA-Z0-9_,]*$')]]
    });
    this.labelForm.valueChanges.subscribe((data) => {
      this._customValidation.validate(data, this.labelForm, this.labelFormField, this.labelValidationMessages)
    });
  }

  createLabel() {
    if(this.labelForm.valid) {

    } else{
      this._customValidation.validateAllFormFields(this.labelForm, this.labelFormField, this.labelValidationMessages);
    }
  }

}
