import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsListComponent } from './components/locations-list/locations-list.component';
import { LocationsDetailComponent } from './components/locations-detail/locations-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LocationsFormComponent } from './components/locations-form/locations-form.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    LocationsListComponent,
    LocationsDetailComponent,
    LocationsFormComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, ToastModule,
  ],
  providers: [MessageService]

})
export class LocationsModule { }
