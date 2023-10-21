import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsDetailComponent } from './components/events-detail/events-detail.component';
import { EventsFormComponent } from './components/events-form/events-form.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { AdminGuardService } from '../auth/admin-guard.service';
import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'eventsList',
    component: EventsListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'eventsDetail/:id',
    component: EventsDetailComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'eventsForm',
    component: EventsFormComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: 'eventsForm/:id',
    component: EventsFormComponent,
    canActivate: [AdminGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule { }
