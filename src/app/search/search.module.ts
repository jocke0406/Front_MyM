import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';



@NgModule({
  declarations: [
    SearchBarComponent,
    SearchResultsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SearchModule { }
