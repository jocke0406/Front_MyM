import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCerclesComponent } from './components/admin-cercles/admin-cercles.component';
import { AdminLocationsComponent } from './components/admin-locations/admin-locations.component';
import { AdminEventsComponent } from './components/admin-events/admin-events.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminGuardService } from '../auth/admin-guard.service';


const routes: Routes = [
  { path: 'adminCercles', component: AdminCerclesComponent, canActivate: [AdminGuardService] },
  { path: 'adminLocations', component: AdminLocationsComponent, canActivate: [AdminGuardService] },
  { path: 'adminUsers', component: AdminUsersComponent, canActivate: [AdminGuardService] },
  { path: 'adminEvents', component: AdminEventsComponent, canActivate: [AdminGuardService] },
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
