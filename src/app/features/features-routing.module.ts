import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { FeaturesComponent } from './features.component';
import { LabelsComponent } from './labels/labels.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
    {
        path: '',
        component: FeaturesComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
            {
                path:'organizations',
                component:OrganizationsComponent
            },
            {
                path:'events',
                component: EventsComponent
            },
            {
                path:'labels',
                component:LabelsComponent
            },
            {
                path:'configurations',
                component: ConfigurationsComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeaturesRoutingModule { }
