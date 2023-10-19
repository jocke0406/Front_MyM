import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RouterModule } from '@angular/router';

import { ToastModule } from 'primeng/toast';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ChangePasswordComponent } from './components/login/change-password/change-password.component'
import { ResetPasswordComponent } from './components/login/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent, ChangePasswordComponent, ResetPasswordComponent, ForgotPasswordComponent,

  ],
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    ButtonModule, ToastModule, BrowserAnimationsModule,
    InputTextModule, CalendarModule, DropdownModule, CheckboxModule, RadioButtonModule
  ],
  providers: []
})
export class AuthModule { }
