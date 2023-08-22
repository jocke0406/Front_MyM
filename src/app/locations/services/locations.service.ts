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
        return throwError(() => new Error('Oups'));
      }),
    );
  }

  getLocationFull(id: string): Observable<Location[]> {
    return this._http.get<Location[]>(`${this.url}/${id}/full`).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Erreur lors de la récupération de la location complète.'));
      })
    );
  }
}


