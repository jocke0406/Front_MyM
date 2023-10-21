import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cercle } from '../models/cercle';

@Injectable({
  providedIn: 'root',
})
export class CerclesService {
  url = environment.backUrl + '/cercles';

  constructor(private _http: HttpClient) { }

  getCerclessAll(): Observable<Cercle[]> {
    return this._http.get<Cercle[]>(`${this.url}`).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(
          () =>
            new Error('Oups !?! Erreur lors de la récupération des cercles.')
        );
      })
    );
  }

  getCerclesOne(id: string): Observable<Cercle> {
    return this._http.get<Cercle>(`${this.url}/${id}`).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(
          () => new Error('Oups !?! Erreur lors de la récupération du cercle.')
        );
      })
    );
  }

  getCerclesMembers(id: string): Observable<Cercle> {
    return this._http.get<Cercle[]>(`${this.url}/${id}/members`).pipe(
      map((response) => response[0]),
      catchError((error) => {
        console.error(error);
        return throwError(
          () => new Error('Oups !?! Erreur lors de la récupération du cercle.')
        );
      })
    );
  }

  getCercleLocation(id: string): Observable<Cercle> {
    return this._http.get<Cercle>(`${this.url}/${id}/location`).pipe(
      map((response) => response),
      catchError((error) => {
        console.error(error);
        return throwError(
          () => new Error('Oups !?! Erreur lors de la récupération du cercle.')
        );
      })
    );
  }

  getCercleEvents(id: string): Observable<Cercle[]> {
    return this._http.get<Cercle[]>(`${this.url}/${id}/events`).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(
          () => new Error('Oups !?! Erreur lors de la récupération du cercle.')
        );
      })
    );
  }

  submitCercleLocation(cercleForm: Cercle): Observable<Cercle> {
    return this._http.post<Cercle>(`${this.url}`, cercleForm).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(
          () => new Error("Oups !?! Erreur lors de l' envoi du formulaire.")
        );
      })
    );
  }

  updateCercle(id: string, cercleForm: Cercle): Observable<Cercle> {
    return this._http.patch<Cercle>(`${this.url}/${id}`, cercleForm).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(
          () => new Error('Oups !?! Erreur lors de la mise à jour du cercle.')
        );
      })
    );
  }

  deleteCercle(id: string): Observable<any> {
    return this._http.delete(`${this.url}/${id}`).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(
          () => new Error('Oups !?! Erreur lors de la suppression du cercle.')
        );
      })
    );
  }
}
