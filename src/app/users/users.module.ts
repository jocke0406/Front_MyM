import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersListComponent } from './components/users-list/users-list.component';



@NgModule({
  declarations: [
    UserProfileComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
