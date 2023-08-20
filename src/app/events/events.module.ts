import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventsDetailComponent } from './components/events-detail/events-detail.component';



@NgModule({
  declarations: [
    EventsListComponent,
    EventsDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EventsModule { }
