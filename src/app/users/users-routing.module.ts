import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
  {
    path: 'usersList',
    component: UsersListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'userProfile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }
