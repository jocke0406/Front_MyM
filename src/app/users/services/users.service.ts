import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = environment.backUrl + '/users';
  constructor(private _http: HttpClient) { }
  getUsersAll(): Observable<User[]> {
    return this._http.get<User[]>(`${this.url}`).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(
          () => new Error('Oups !?! Erreur lors de la récupération des users.')
        );
      })
    );
  }

  getUsersOne(id: string): Observable<User> {
    return this._http.get<User>(`${this.url}/${id}`).pipe(
      map((user: User) => {
        if (user.dateOfBirth) {
          user.dateOfBirth = new Date(user.dateOfBirth);
        }
        return user;
      }),
      catchError((error) => {
        console.error(error);
        return throwError(
          () => new Error('Oups !?! Erreur lors de la récupération de user.')
        );
      })
    );
  }

  getUserFull(id: string): Observable<User> {
    return this._http.get<User>(`${this.url}/${id}/full`).pipe(
      map((user: User) => {
        if (user.dateOfBirth) {
          user.dateOfBirth = new Date(user.dateOfBirth);
        }
        return user;
      }),
      catchError((error) => {
        console.error(error);
        return throwError(
          () => new Error('Oups !?! Erreur lors de la récupération de user.')
        );
      })
    );
  }

  deleteUser(id: string): Observable<any> {
    return this._http.delete(`${this.url}/${id}`).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error('Oups !?! Erreur lors du profil'));
      })
    );
  }

  getUserFriends(userId: string): Observable<User[]> {
    return this._http.get<User[]>(`${this.url}/${userId}/friends`).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error('Oups !?! Erreur lors du profil'));
      })
    );
  }

  getUserEvents(userId: string): Observable<any> {
    return this._http.get<any>(`${this.url}/${userId}/events`).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(
          () => new Error('Oups !?! Erreur lors des events de l utilisateurs')
        );
      })
    );
  }

  addFriend(userConnectedId: string, friendId: string): Observable<User> {
    return this._http
      .patch<User>(`${this.url}/${userConnectedId}/addFriend`, { friendId })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('Oups !?! Erreur lors du profil'));
        })
      );
  }

  removeFriend(userConnectedId: string, friendId: string) {
    return this._http
      .patch<User>(`${this.url}/${userConnectedId}/removeFriend`, { friendId })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('Oups !?! Erreur lors du profil'));
        })
      );
  }
}
