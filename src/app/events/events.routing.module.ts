import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventsDetailComponent } from './components/events-detail/events-detail.component';
import { EventsFormComponent } from './components/events-form/events-form.component';

const routes: Routes = [
  { path: 'eventsList', component: EventsListComponent },
  { path: 'eventsDetail/:id', component: EventsDetailComponent },
  { path: 'eventsForm', component: EventsFormComponent },
  { path: 'eventsForm/:id', component: EventsFormComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
