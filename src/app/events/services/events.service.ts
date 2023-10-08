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

  getEventOne(id: string): Observable<Event> {
    return this._http.get<Event>(`${this.url}/${id}`).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Oups !?! Erreur lors de la récupération de l \'event.'));
      }),
    );
  }

  submitEvent(eventForm: Event): Observable<Event> {
    return this._http.post<Event>(`${this.url}`, eventForm).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Oups !?! Erreur lors de l\' envoi du formulaire.'));
      })
    );
  }

  updateEvent(id: string, eventForm: Event): Observable<Event> {
    return this._http.patch<Event>(`${this.url}/${id}`, eventForm).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Oups !?! Erreur lors de la mise à jour du event.'));
      })
    );
  }

  deleteEvent(id: string): Observable<any> {
    return this._http.delete(`${this.url}/${id}`).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Oups !?! Erreur lors de la suppression du event.'));
      })
    );
  }

  eventAddParticipant(eventId: string, userId: string): Observable<Event> {
    const payloud = { userId, updatedAt: new Date().toISOString() };
    return this._http.patch<Event>(`${this.url}/${eventId}/addParticipant`, payloud).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Oups !?! Erreur lors de l\'ajout'))
      })
    )
  }



  eventRemoveParticipant(eventId: string, userId: string): Observable<Event> {
    const payloud = { userId };
    return this._http.patch<Event>(`${this.url}/${eventId}/removeParticipant`, payloud).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Oups !?! Erreur lors de la suppression'))
      })
    )
  }

}
