import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FeaturesComponent } from './features.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { HeaderComponent } from '../shared/header/header.component';
import { SideNavComponent } from '../shared/side-nav/side-nav.component';

import {AutoCompleteModule} from 'primeng/autocomplete';
import {TooltipModule} from 'primeng/tooltip';
import {CardModule} from 'primeng/card';


import { EventsComponent } from './events/events.component';
import { LabelsComponent } from './labels/labels.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { CustomValidations } from '../shared/custom/validations';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeaturesRoutingModule,
    AutoCompleteModule,
    TooltipModule,
    CardModule,
    HttpClientModule
  ],
  declarations: [
    FeaturesComponent,
    HeaderComponent,
    SideNavComponent,
    EventsComponent,
    LabelsComponent,
    ConfigurationsComponent,
    OrganizationsComponent,
    SettingsComponent
  ],
  providers:[CustomValidations],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeaturesModule { }
