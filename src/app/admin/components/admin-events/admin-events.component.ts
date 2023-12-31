import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { Event } from 'src/app/events/models/event';
import { EventsService } from '../../../events/services/events.service';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css'],
})
export class AdminEventsComponent implements OnInit, OnDestroy {
  eventsList!: Event[];
  private _unsubscribeAll = new Subject<void>();

  constructor(private _messageService: MessageService, private _eventsService: EventsService) { }


  ngOnInit(): void {
    this._eventsService.getEventsAll()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (data) => {
          this.eventsList = data.filter((event: Event) => !event.deletedAt);
        },
        error: (error) => {
          console.log("Erreur lors du chargement des events :", error);
        }
      });
  }
  sortEventsByName(): void {
    this.eventsList.sort((a, b) => {
      if (a.name && b.name && a.name < b.name) {
        return -1;
      }
      if (a.name && b.name && a.name > b.name) {
        return 1;
      }
      return 0;
    })
  }
  sortEventsByStartDate() {
    this.eventsList.sort((a, b) => {
      if (a.startAt && b.startAt && a.startAt < b.startAt) {
        return -1;
      }
      if (a.startAt && b.startAt && a.startAt > b.startAt) {
        return 1;
      }
      return 0;
    })
  }

  deleteEvent(eventId: string): void {
    this._eventsService.deleteEvent(eventId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: () => {
          this._messageService.add({ severity: 'success', summary: 'Succès', detail: 'Event supprimé avec succès' });
          this.refreshEvents();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du Event, détails :', error);
          this._messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s\'est produite lors de la suppression du Cercle' });
        }
      });
  }

  refreshEvents(): void {
    this._eventsService.getEventsAll()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (events: Event[]) => {
          this.eventsList = events.filter(event => !event.deletedAt);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des events, détails:', error);
          this._messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s\'est produite lors de la mise à jour de la liste' });

        }
      });
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
