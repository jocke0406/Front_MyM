import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventsDetailComponent } from './components/events-detail/events-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { EventsFormComponent } from './components/events-form/events-form.component';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    EventsListComponent,
    EventsDetailComponent, EventsFormComponent
  ],
  imports: [ReactiveFormsModule, BrowserAnimationsModule, ButtonModule, InputTextModule, ToastModule, CalendarModule,
    CommonModule, DropdownModule, RouterModule
  ],
  providers: []
})
export class EventsModule { }
