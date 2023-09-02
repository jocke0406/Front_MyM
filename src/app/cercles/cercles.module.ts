import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CerclesListComponent } from './components/cercles-list/cercles-list.component';
import { CerclesDetailComponent } from './components/cercles-detail/cercles-detail.component';
import { CerclesFormComponent } from './components/cercles-form/cercles-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    CerclesListComponent,
    CerclesDetailComponent,
    CerclesFormComponent
  ],
  imports: [
    CommonModule, DropdownModule, ReactiveFormsModule, ButtonModule, InputTextModule, ToastModule, BrowserAnimationsModule
  ],
  providers: [MessageService]
})
export class CerclesModule { }
