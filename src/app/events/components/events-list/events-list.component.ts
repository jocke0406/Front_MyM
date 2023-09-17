import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Event } from '../../models/event';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit, OnDestroy {

  eventsList!: Event[];
  paginatedEventsList: Event[] = [];
  eventsPerPage: number = 3;
  currentPage: number = 1;
  totalPages: number = 1;
  pagesArray: number[] = [];
  private _unsubscribeAll = new Subject<void>();

  constructor(private _eventsService: EventsService) { }
  ngOnInit(): void {
    this._eventsService.getEventsAll().pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (data) => {
        this.eventsList = data.filter((event: Event) => !event.deletedAt);
        this.setupPagination();
      },
      error: (error) => {
        console.log("une erreur s est produite lors de la récupération des events", error)
      }
    })
  }

  setupPagination() {
    this.totalPages = Math.ceil(this.eventsList.length / this.eventsPerPage);
    this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1); // génère un tableau [1, 2, ..., totalPages]
    this.updatePaginatedEvents();
  }


  updatePaginatedEvents() {
    const startIndex = (this.currentPage - 1) * this.eventsPerPage;
    this.paginatedEventsList = this.eventsList.slice(startIndex, startIndex + this.eventsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedEvents();
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
