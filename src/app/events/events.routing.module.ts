import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventsDetailComponent } from './components/events-detail/events-detail.component';

const routes: Routes = [
  { path: 'eventsList', component: EventsListComponent },
  { path: 'eventsDetail/:id', component: EventsDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
