import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Cercle } from '../models/cercle';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CerclesService {

  url = environment.backUrl + "/cercles";

  constructor(private _http: HttpClient) { }

  getCerclessAll(): Observable<Cercle[]> {
    return this._http.get<Cercle[]>(`${this.url}`).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Oups'));
      }),
    );
  }
  getCerclesOne(id: string): Observable<Cercle> {
    return this._http.get<Cercle>(`${this.url}/${id}`).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Erreur lors de la récupération du cercle.'));
      })
    );
  }
}
