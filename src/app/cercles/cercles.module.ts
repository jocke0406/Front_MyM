import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CerclesListComponent } from './components/cercles-list/cercles-list.component';
import { CerclesDetailComponent } from './components/cercles-detail/cercles-detail.component';
import { CerclesFormComponent } from './components/cercles-form/cercles-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    CerclesListComponent,
    CerclesDetailComponent,
    CerclesFormComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule
  ]
})
export class CerclesModule { }
