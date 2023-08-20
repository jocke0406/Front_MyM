import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsListComponent } from './components/locations-list/locations-list.component';
import { LocationsDetailComponent } from './components/locations-detail/locations-detail.component';



@NgModule({
  declarations: [
    LocationsListComponent,
    LocationsDetailComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class LocationsModule { }
