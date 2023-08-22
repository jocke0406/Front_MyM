import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CerclesListComponent } from './components/cercles-list/cercles-list.component';
import { CerclesDetailComponent } from './components/cercles-detail/cercles-detail.component';


const routes: Routes = [
  { path: 'cerclesList', component: CerclesListComponent },
  { path: 'cerclesDetail/:id', component: CerclesDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CerclesRoutingModule { }
