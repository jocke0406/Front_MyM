import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CerclesListComponent } from './components/cercles-list/cercles-list.component';
import { CerclesDetailComponent } from './components/cercles-detail/cercles-detail.component';
import { CerclesFormComponent } from './components/cercles-form/cercles-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    CerclesListComponent,
    CerclesDetailComponent,
    CerclesFormComponent
  ],
  imports: [
    CommonModule, TooltipModule, RouterModule, DropdownModule, ReactiveFormsModule, ButtonModule, InputTextModule, ToastModule, BrowserAnimationsModule
  ],
  providers: []
})
export class CerclesModule { }
