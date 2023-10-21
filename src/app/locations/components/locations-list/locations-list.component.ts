import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '../../models/location';
import { LocationsService } from '../../services/locations.service';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css'],
})
export class LocationsListComponent implements OnInit, OnDestroy {

  public locationsList!: Location[];
  paginatedLocationsList: Location[] = [];
  locationsPerPage: number = 3;
  currentPage: number = 1;
  totalPages: number = 1;
  pagesArray: number[] = [];
  private _unsubscribeAll = new Subject<void>();

  constructor(private _locationService: LocationsService) { }

  ngOnInit(): void {
    this._locationService
      .getLocationsAll()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (data) => {
          this.locationsList = data.filter(
            (location: Location) => !location.deletedAt
          );
          this.setupPagination();
        },
        error: (error) => {
          console.log('Erreur lors du chargement des locations :', error);
        },
      });
  }

  setupPagination() {
    this.totalPages = Math.ceil(
      this.locationsList.length / this.locationsPerPage
    );
    this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1); // génère un tableau [1, 2, ..., totalPages]
    this.updatePaginatedLocations();
  }

  updatePaginatedLocations() {
    const startIndex = (this.currentPage - 1) * this.locationsPerPage;
    this.paginatedLocationsList = this.locationsList.slice(
      startIndex,
      startIndex + this.locationsPerPage
    );
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedLocations();
  }

  getVisiblePages(): number[] {
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(this.totalPages, this.currentPage + 2);

    return Array(endPage - startPage + 1)
      .fill(0)
      .map((_, idx) => startPage + idx);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
