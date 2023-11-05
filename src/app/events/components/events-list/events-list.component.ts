import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Event } from '../../models/event';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
})
export class EventsListComponent implements OnInit, OnDestroy {
  currentUserId?: string;
  eventsList!: Event[];
  paginatedEventsList: Event[] = [];
  eventsPerPage: number = 3;
  currentPage: number = 1;
  totalPages: number = 1;
  pagesArray: number[] = [];
  currentDate = new Date();
  private _unsubscribeAll = new Subject<void>();

  constructor(
    private _eventsService: EventsService,
    private _auth: AuthService
  ) { }
  ngOnInit(): void {
    combineLatest([
      this._auth.userConnectedId$,
      this._eventsService.getEventsAll(),
    ])
      .pipe(
        filter(([userConnectedId, _]) => !!userConnectedId),
        map(([userConnectedId, events]) => {
          const currentDate = new Date();

          const filteredEvents = events.filter(
            (event: Event) =>
              !event.deletedAt && new Date(event.startAt) > currentDate
          );

          const eventsWithParticipation = filteredEvents.map((event: Event) => {
            return {
              ...event,
              isParticipating: event.participants_ids!.includes(
                userConnectedId!
              ),
            };
          });

          return [userConnectedId, eventsWithParticipation];
        }),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe({
        next: (results: (string | Event[] | null)[]) => {
          if (results.length !== 2) {
            console.error('Mauvais format de données reçu!');
            return;
          }

          this.currentUserId = results[0] as string;
          this.eventsList = results[1] as Event[];

          if (!this.currentUserId || !this.eventsList) {
            console.error('Des données sont manquantes!');
            return;
          }

          this.setupPagination();
        },
        error: (error: any) => {
          console.log(
            "une erreur s'est produite lors de la récupération des events",
            error
          );
        },
      });
  }

  setupPagination() {
    this.totalPages = Math.ceil(this.eventsList.length / this.eventsPerPage);
    this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1); // génère un tableau [1, 2, ..., totalPages]
    this.updatePaginatedEvents();
  }

  updatePaginatedEvents() {
    const startIndex = (this.currentPage - 1) * this.eventsPerPage;
    this.paginatedEventsList = this.eventsList.slice(
      startIndex,
      startIndex + this.eventsPerPage
    );
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedEvents();
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
