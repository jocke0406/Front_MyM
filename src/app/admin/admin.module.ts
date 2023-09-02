import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCerclesComponent } from './components/admin-cercles/admin-cercles.component';
import { AdminEventsComponent } from './components/admin-events/admin-events.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminLocationsComponent } from './components/admin-locations/admin-locations.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { HttpClientModule } from '@angular/common/http';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AdminCerclesComponent, AdminEventsComponent, AdminUsersComponent, AdminLocationsComponent],
  imports: [
    CommonModule, ToastModule, RouterModule, TooltipModule, HttpClientModule, BrowserAnimationsModule
  ],
  providers: [MessageService]
})
export class AdminModule { }
