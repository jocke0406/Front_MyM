import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = environment.backUrl + "/users";
  constructor(private _http: HttpClient) { }
  getUsersAll(): Observable<User[]> {
    return this._http.get<User[]>(`${this.url}`).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Oups !?! Erreur lors de la récupération des users.'));
      }),
    );
  };

  getUsersOne(id: string): Observable<User> {
    return this._http.get<User>(`${this.url}/${id}`).pipe(
      map((user: User) => {
        if (user.dateOfBirth) {
          user.dateOfBirth = new Date(user.dateOfBirth);
        }
        return user;
      }),
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Oups !?! Erreur lors de la récupération de user.'));
      }),
    );
  }
}
