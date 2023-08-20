import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CerclesListComponent } from './components/cercles-list/cercles-list.component';
import { CerclesDetailComponent } from './components/cercles-detail/cercles-detail.component';



@NgModule({
  declarations: [
    CerclesListComponent,
    CerclesDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CerclesModule { }
