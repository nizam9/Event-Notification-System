import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidations, FormFields, ValidationMessages } from 'src/app/shared/custom/validations';
import { HttpRequest, HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {

  organizationForm: FormGroup
  organizationFormField = FormFields.organizationForm;
  organizationValidationMessages = ValidationMessages.orgMessages;
  finalGroupedFileData: any;
  fileUploadProgress: number;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _customValidation: CustomValidations,
    private _httpClient: HttpClient,
  ) {
    this.createOrgForm();
  }

  ngOnInit() {
  }

  createOrgForm() {
    this.organizationForm = this.fb.group({
      organizationName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]*$')]],
      organizationImage: ['']
    });
    this.organizationForm.valueChanges.subscribe((data) => {
      this._customValidation.validate(data, this.organizationForm, this.organizationFormField, this.organizationValidationMessages)
    });
  }

  bytesToSize = function (bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) { return '0 Byte'; }
    const i = (Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  };

  handleFile(e) {
    const files = e.target.files;
    const file_types = ['image/jpeg', 'image/jpg', 'image/gif', 'image/png'];
    const imageDimensions = [];
    // validate file type and size
    // if (!(file_types.includes(files[i].type))) { alert('Please select valid filetype'); return false; }
    // if (files[i].size > 700000) { alert('file is too large'); return false; }

    for (let i = 0; i < files.length; i++) {
      const fileSize = this.bytesToSize(files[i].size);
      const reader = new FileReader();
      reader.onload = (res: any) => {
        this.finalGroupedFileData = {
          sno: i + 1,
          name: files[i].name,
          size: fileSize,
          type: files[i].type,
          file: files[i],
        };
        console.log(this.finalGroupedFileData, 'finalGroupedFileData')
      };
      reader.readAsDataURL(files[i]);
      const fileToUpload = {
        file: files[i]
      };
      console.log(fileToUpload, 'fileToUpload')
    }

  }

  createOrg() {
    console.log(this.organizationForm.value);
    if (this.organizationForm.valid) {

      const formData: FormData = new FormData();

      formData.append('files', this.finalGroupedFileData.file, this.finalGroupedFileData.name);
      formData.append('file_title', this.finalGroupedFileData.name);
      formData.append('file_size', this.finalGroupedFileData.size);

      const req = new HttpRequest('POST', 'uploadFile service here', formData, {
        reportProgress: true,
      });

      const subs = this._httpClient.request(req).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = Math.round(100 * event.loaded / event.total);
          if (this.fileUploadProgress === 100) {
            //completed , success and exit
          }
        }
      });
    } else {
      this._customValidation.validateAllFormFields(this.organizationForm, this.organizationFormField, this.organizationValidationMessages);
    }
  }

  ngOnDestroy() {
    this._customValidation.clearOnRouteChange(this.organizationFormField);
  }

}
