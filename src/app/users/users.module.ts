import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    UserProfileComponent,
    UsersListComponent,
  ],
  imports: [
    CommonModule, BrowserAnimationsModule
  ],
})
export class UsersModule { }
