import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../users/models/user';
import { Observable, catchError, throwError, tap } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  url = environment.backUrl + "/users";
  urlLogin = environment.backUrl + "/login";

  private userConnected = new BehaviorSubject<boolean>(this.isUserConnected());
  public userConnected$ = this.userConnected.asObservable();

  private adminConnected = new BehaviorSubject<boolean>(this.isUserAdmin());
  public adminConnected$ = this.adminConnected.asObservable();

  private userIdSubject = new BehaviorSubject<string | null>(this.getUserConnectedIdFromToken());
  public userConnectedId$ = this.userIdSubject.asObservable()

  constructor(private messageService: MessageService, private _jwtHelper: JwtHelperService, private _http: HttpClient, private router: Router) { }


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

  login(email: string, password: string): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(`${this.urlLogin}`, { email, password })
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          this.userConnected.next(true);
          const decodedToken = this.decodeToken();
          this.userIdSubject.next(this.getUserConnectedIdFromToken());
          if (decodedToken && decodedToken.role === 'masterOfUnivers') {
            this.adminConnected.next(true);
          }
          else {
            this.adminConnected.next(false);
          };

        }),
        catchError(error => {
          console.error('Oups ! Houston nous avons un problème', error);
          return throwError(() => error);
        })
      );
  }

  decodeToken(): any {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error("Erreur lors de la décodage du token!", error);
        return null;
      }
    }
    return null;
  }


  private isUserConnected(): boolean {
    const token = localStorage.getItem('token');
    return token != null && !this._jwtHelper.isTokenExpired(token);
  }

  private isUserAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token || this._jwtHelper.isTokenExpired(token)) {
      console.warn("Token non valide ou expiré!");
      return false;
    }
    const decodedToken = this._jwtHelper.decodeToken(token);
    return decodedToken.role === 'masterOfUnivers';

  }

  private getUserConnectedIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token || this._jwtHelper.isTokenExpired(token)) {
      console.warn("Token non valide ou expiré!");
      return null;
    }
    const decodedToken = this.decodeToken();
    return decodedToken ? decodedToken._id : null;
  }


  logout() {
    localStorage.removeItem('token');
    this.userConnected.next(false);
    this.adminConnected.next(false);
    this.userIdSubject.next(null);
    this.messageService.add({ severity: 'success', summary: 'Déconnecté', detail: 'Vous avez été déconnecté avec succès.', life: 2000 });
    this.router.navigate(['/']);
  }


}
