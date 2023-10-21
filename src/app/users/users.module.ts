import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersListComponent } from './components/users-list/users-list.component';

@NgModule({
  declarations: [UserProfileComponent, UsersListComponent],
  imports: [CommonModule, BrowserAnimationsModule, RouterModule, TooltipModule],
})
export class UsersModule { }
