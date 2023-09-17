import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    UserProfileComponent,
    UsersListComponent,
  ],
  imports: [
    CommonModule, BrowserAnimationsModule, RouterModule
  ],
})
export class UsersModule { }
