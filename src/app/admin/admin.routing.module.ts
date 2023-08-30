import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCerclesComponent } from './components/admin-cercles/admin-cercles.component';
import { AdminLocationsComponent } from './components/admin-locations/admin-locations.component';
import { AdminEventsComponent } from './components/admin-events/admin-events.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
const routes: Routes = [
  { path: 'adminCercles', component: AdminCerclesComponent },
  { path: 'adminLocations', component: AdminLocationsComponent },
  { path: 'adminUsers', component: AdminUsersComponent },
  { path: 'adminEvents', component: AdminEventsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
