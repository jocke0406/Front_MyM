import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { CerclesDetailComponent } from './components/cercles-detail/cercles-detail.component';
import { CerclesFormComponent } from './components/cercles-form/cercles-form.component';
import { CerclesListComponent } from './components/cercles-list/cercles-list.component';

@NgModule({
  declarations: [
    CerclesListComponent,
    CerclesDetailComponent,
    CerclesFormComponent,
  ],
  imports: [
    CommonModule,
    TooltipModule,
    RouterModule,
    DropdownModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    BrowserAnimationsModule,
  ],
  providers: [],
})
export class CerclesModule { }
