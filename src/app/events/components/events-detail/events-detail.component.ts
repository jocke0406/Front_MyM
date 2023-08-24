import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Event } from '../../models/event';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-events-detail',
  templateUrl: './events-detail.component.html',
  styleUrls: ['./events-detail.component.css']
})
export class EventsDetailComponent implements OnInit, OnDestroy {

  event: Event | null = null;
  private _unsubscribeAll = new Subject<void>();

  constructor(private _route: ActivatedRoute, private _eventsService: EventsService) { }
  ngOnInit(): void {
    this._route.params.pipe(
      switchMap(({ id }) => this._eventsService.getEventFull(id)),
      takeUntil(this._unsubscribeAll)
    ).subscribe({
      next: (data) => {
        this.event = data;
        console.log(this.event);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
