import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from '../auth/admin-guard.service';
import { AuthGuardService } from '../auth/auth-guard.service';
import { LocationsDetailComponent } from './components/locations-detail/locations-detail.component';
import { LocationsFormComponent } from './components/locations-form/locations-form.component';
import { LocationsListComponent } from './components/locations-list/locations-list.component';

const routes: Routes = [
  {
    path: 'locationsList',
    component: LocationsListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'locationsDetail/:id',
    component: LocationsDetailComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'locationsForm',
    component: LocationsFormComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: 'locationsForm/:id',
    component: LocationsFormComponent,
    canActivate: [AdminGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationsRoutingModule { }
