import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cercle } from '../../models/cercle';
import { CerclesService } from '../../services/cercles.service';

@Component({
  selector: 'app-cercles-list',
  templateUrl: './cercles-list.component.html',
  styleUrls: ['./cercles-list.component.css']
})
export class CerclesListComponent implements OnInit, OnDestroy {

  paginatedCerclesList: Cercle[] = [];
  cerclesPerPage: number = 3;
  currentPage: number = 1;
  cerclesList: Cercle[] = [];
  totalPages: number = 1;
  pagesArray: number[] = [];
  private _unsubscribeAll = new Subject<void>();

  constructor(private _cerclesService: CerclesService) { };

  ngOnInit(): void {
    this._cerclesService.getCerclessAll()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (data) => {
          this.cerclesList = data.filter((cercle: Cercle) => !cercle.deletedAt || cercle.deletedAt === null);
          this.setupPagination();
        },
        error: (error) => {
          console.log(error);
        }
      }

      );
  }

  setupPagination() {
    this.totalPages = Math.ceil(this.cerclesList.length / this.cerclesPerPage);
    this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1); // génère un tableau [1, 2, ..., totalPages]
    this.updatePaginatedCercles();
  }


  updatePaginatedCercles() {
    const startIndex = (this.currentPage - 1) * this.cerclesPerPage;
    this.paginatedCerclesList = this.cerclesList.slice(startIndex, startIndex + this.cerclesPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedCercles();
  }
  getVisiblePages(): number[] {
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(this.totalPages, this.currentPage + 2);

    return Array(endPage - startPage + 1).fill(0).map((_, idx) => startPage + idx);
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
