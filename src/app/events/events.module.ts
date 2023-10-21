import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { EventsDetailComponent } from './components/events-detail/events-detail.component';
import { EventsFormComponent } from './components/events-form/events-form.component';
import { EventsListComponent } from './components/events-list/events-list.component';

@NgModule({
  declarations: [
    EventsListComponent,
    EventsDetailComponent,
    EventsFormComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    CalendarModule,
    CommonModule,
    DropdownModule,
    RouterModule,
    TooltipModule,
  ],
  providers: [],
})
export class EventsModule { }
