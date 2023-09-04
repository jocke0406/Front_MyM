import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../users/models/user';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.backUrl + "/users";
  constructor(private _http: HttpClient) { }

  submitUser(registrationForm: User): Observable<User> {
    return this._http.post<User>(`${this.url}`, registrationForm).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Oups !?! Erreur lors de l\' envoi du formulaire.'));
      })
    );
  }

  updateUser(id: string, registrationForm: User): Observable<User> {
    return this._http.patch<User>(`${this.url}/${id}`, registrationForm).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Oups !?! Erreur lors de la mise à jour du cercle.'));
      })
    );
  }

  deleteUser(id: string): Observable<any> {
    return this._http.delete(`${this.url}/${id}`).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Oups !?! Erreur lors du profil'));
      })
    );
  }

}
