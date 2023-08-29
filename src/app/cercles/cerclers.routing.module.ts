import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CerclesListComponent } from './components/cercles-list/cercles-list.component';
import { CerclesDetailComponent } from './components/cercles-detail/cercles-detail.component';
import { CerclesFormComponent } from './components/cercles-form/cercles-form.component';

const routes: Routes = [
  { path: 'cerclesList', component: CerclesListComponent },
  { path: 'cerclesDetail/:id/events', component: CerclesDetailComponent },
  { path: 'cerclesForm', component: CerclesFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CerclesRoutingModule { }
