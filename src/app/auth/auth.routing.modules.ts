import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { ChangePasswordComponent } from './components/login/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/login/reset-password/reset-password.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'registration', component: RegisterComponent },
  {
    path: 'registration/:id',
    component: RegisterComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'auth/forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'auth/reset-password', component: ResetPasswordComponent },
  {
    path: 'auth/change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
