import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LocationsListComponent } from './locations/components/locations-list/locations-list.component';

const routes: Routes = [
  { path: 'locations', component: LocationsListComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
