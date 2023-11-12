import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscoverComponent } from './components/discover/discover.component';
import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes = [{ path: 'discover', canActivate: [AuthGuardService], component: DiscoverComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscoverRoutingModule { }
