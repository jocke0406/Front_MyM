import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Location } from '../models/location';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LocationsService {

  url = environment.backUrl + "/locations";

  constructor(private _http: HttpClient) { }

  getLocationsAll(): Observable<Location[]> {
    return this._http.get<Location[]>(`${this.url}`).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Oups !?! Erreur lors de la récupération des locations.'));
      }),
    );
  }

  getLocationFull(id: string): Observable<Location[]> {
    return this._http.get<Location[]>(`${this.url}/${id}/full`).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Oups !?! Erreur lors de la récupération de la location.'));
      })
    );
  }

  submitFormLocation(locationForm: Location): Observable<Location> {
    return this._http.post<Location>(`${this.url}`, locationForm).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Oups !?! Erreur lors de l\' envoi du formulaire.'));
      })
    );
  }

  updateLocation(id: string, locationForm: Location): Observable<any> {
    return this._http.patch(`${this.url}/${id}`, locationForm).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Oups !?! Erreur lors de la mise à jour de la location.'));
      })
    );
  }

  deleteLocation(id: string): Observable<any> {
    return this._http.delete(`${this.url}/${id}`).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Oups !?! Erreur lors de la suppression de la location.'));
      })
    );
  }

}

