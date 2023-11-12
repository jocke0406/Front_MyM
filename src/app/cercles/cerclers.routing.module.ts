import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from '../auth/admin-guard.service';
import { AuthGuardService } from '../auth/auth-guard.service';
import { CerclesDetailComponent } from './components/cercles-detail/cercles-detail.component';
import { CerclesFormComponent } from './components/cercles-form/cercles-form.component';
import { CerclesListComponent } from './components/cercles-list/cercles-list.component';

const routes: Routes = [
  {
    path: 'cerclesList',
    component: CerclesListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'cerclesDetail/:id',
    component: CerclesDetailComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'cerclesForm',
    component: CerclesFormComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: 'cerclesForm/:id',
    component: CerclesFormComponent,
    canActivate: [AdminGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CerclesRoutingModule { }
