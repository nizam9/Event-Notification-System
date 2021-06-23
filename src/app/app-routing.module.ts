import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }, {
    path: 'features',
    loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
