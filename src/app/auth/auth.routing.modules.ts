import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: 'registration', component: RegisterComponent },
  { path: 'registration/:id', component: RegisterComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'auth/forgot-password', component: ForgotPasswordComponent }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
