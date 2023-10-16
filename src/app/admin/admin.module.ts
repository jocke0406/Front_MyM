import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { AdminCerclesComponent } from './components/admin-cercles/admin-cercles.component';
import { AdminEventsComponent } from './components/admin-events/admin-events.component';
import { AdminLocationsComponent } from './components/admin-locations/admin-locations.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AdminCerclesComponent, AdminEventsComponent, AdminUsersComponent, AdminLocationsComponent],
  imports: [
    CommonModule, ToastModule, RouterModule, TooltipModule, HttpClientModule, BrowserAnimationsModule
  ],
  providers: []
})
export class AdminModule { }
