import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsListComponent } from './components/locations-list/locations-list.component';
import { LocationsDetailComponent } from './components/locations-detail/locations-detail.component';
import { LocationsFormComponent } from './components/locations-form/locations-form.component';

const routes: Routes = [
  { path: 'locationsList', component: LocationsListComponent },
  { path: 'locationsDetail/:id', component: LocationsDetailComponent },
  { path: 'locationsForm', component: LocationsFormComponent },
  { path: 'locationsForm/:id', component: LocationsFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
