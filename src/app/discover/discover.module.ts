import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscoverComponent } from './components/discover/discover.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DiscoverComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  providers: []
})
export class DiscoverModule { }
