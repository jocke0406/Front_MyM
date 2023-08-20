import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Location } from '../models/location';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class LocationsService {
  url = "https://backmym.jocke.be/locations";

  constructor(private _http: HttpClient) { }

  getLocationsAll(): Observable<Location[]> {
    return this._http.get<Location[]>(`${this.url}`).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Oups'));
      }),
    );
  }
  getLocationOne(id: string | null): Observable<Location> {
    return this._http.get<Location>(`${this.url}/${id}`).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Oups'))

      }),
    );
  }

}
