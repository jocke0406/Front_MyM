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
  public eventsList!: Event[];
  private _unsubscribeAll = new Subject<void>();

  constructor(private _eventsService: EventsService) { }
  ngOnInit(): void {
    this._eventsService.getEventsAll().pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (data) => {
        this.eventsList = data.filter((event: Event) => !event.deletedAt);
        console.log(this.eventsList);
      },
      error: (error) => {
        console.log("une erreur s est produite lors de la récupération des events", error)
      }
    })
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
