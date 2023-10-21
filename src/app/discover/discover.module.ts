import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { DiscoverComponent } from './components/discover/discover.component';

@NgModule({
  declarations: [DiscoverComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    TooltipModule,
    RouterModule,
  ],
  providers: [],
})
export class DiscoverModule { }
