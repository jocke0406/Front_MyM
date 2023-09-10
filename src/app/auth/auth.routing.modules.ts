import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes = [
  { path: 'registration', component: RegisterComponent },
  { path: 'registration/:id', component: RegisterComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
