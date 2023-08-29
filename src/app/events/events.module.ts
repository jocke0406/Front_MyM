import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventsDetailComponent } from './components/events-detail/events-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { EventsFormComponent } from './components/events-form/events-form.component';


@NgModule({
  declarations: [
    EventsListComponent,
    EventsDetailComponent, EventsFormComponent
  ],
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, CalendarModule,
    CommonModule
  ]
})
export class EventsModule { }
