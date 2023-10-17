import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscoverComponent } from './components/discover/discover.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    DiscoverComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, InputTextModule, TooltipModule, RouterModule
  ],
  providers: []
})
export class DiscoverModule { }
