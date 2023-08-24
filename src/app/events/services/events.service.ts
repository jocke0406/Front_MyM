import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Event } from '../models/event';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EventsService {
  url = environment.backUrl + "/events";
  constructor(private _http: HttpClient) { }
  getEventsAll(): Observable<Event[]> {
    return this._http.get<Event[]>(`${this.url}`).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Oups !?! Erreur lors de la récupération des events.'));
      }),
    );
  }

  getEventFull(id: string): Observable<Event> {
    return this._http.get<Event>(`${this.url}/${id}/full`).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Oups !?! Erreur lors de la récupération de l \'event.'));
      }),
    );
  }
}
