import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { LocationsDetailComponent } from './components/locations-detail/locations-detail.component';
import { LocationsFormComponent } from './components/locations-form/locations-form.component';
import { LocationsListComponent } from './components/locations-list/locations-list.component';

@NgModule({
  declarations: [
    LocationsListComponent,
    LocationsDetailComponent,
    LocationsFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    BrowserAnimationsModule,
  ],
  providers: [],
})
export class LocationsModule { }
