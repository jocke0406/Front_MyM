import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, switchMap, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../users/models/user';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.backUrl + '/users';
  private urlLogin = environment.backUrl + '/login';
  private urlCsrfToken = environment.backUrl + '/api/csrf-token';

  private userConnected = new BehaviorSubject<boolean>(this.isUserConnected());
  public userConnected$ = this.userConnected.asObservable();

  private adminConnected = new BehaviorSubject<boolean>(this.isUserAdmin());
  public adminConnected$ = this.adminConnected.asObservable();

  private userIdSubject = new BehaviorSubject<string | null>(
    this.getUserConnectedIdFromToken()
  );
  public userConnectedId$ = this.userIdSubject.asObservable();

  constructor(
    private messageService: MessageService,
    private _jwtHelper: JwtHelperService,
    private _http: HttpClient,
    private router: Router
  ) { }

  submitUser(registrationForm: User): Observable<User> {
    return this._http.post<User>(`${this.url}`, registrationForm).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  updateUser(id: string, registrationForm: User): Observable<User> {
    return this._http.patch<User>(`${this.url}/${id}`, registrationForm).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(
          () => new Error('Oups !?! Erreur lors de la mise à jour du cercle.')
        );
      })
    );
  }

  getCsrfToken(): Observable<{ csrfToken: string }> {
    return this._http.get<{ csrfToken: string }>(this.urlCsrfToken, { withCredentials: true });
  }

  login(email: string, password: string): Observable<AuthResponse> {
    // Récupérez d'abord le token CSRF
    return this.getCsrfToken().pipe(
      switchMap((csrfData) => {
        // Stockez le token CSRF
        localStorage.setItem('csrfToken', csrfData.csrfToken);
        // Préparez les headers
        const headers = { 'CSRF-Token': csrfData.csrfToken };
        // Effectuez la requête de connexion avec les données de l'utilisateur et les headers rajouter :{ headers, withCredentials: true }
        return this._http.post<AuthResponse>(this.urlLogin, { email, password },);
      }),
      tap((res) => {
        // Stockez le token de l'utilisateur et mettez à jour le statut de connexion
        localStorage.setItem('token', res.token);
        this.userConnected.next(true);
        const decodedToken = this.decodeToken();
        this.userIdSubject.next(this.getUserConnectedIdFromToken());
        if (decodedToken && decodedToken.role === 'masterOfUnivers') {
          this.adminConnected.next(true);
        } else {
          this.adminConnected.next(false);
        }
      }),
      catchError((error) => {
        // Gestion des erreurs
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
        console.error('Erreur lors de la décodage du token!', error);
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
      console.warn('Token non valide ou expiré!');
      return false;
    }
    const decodedToken = this._jwtHelper.decodeToken(token);
    return decodedToken.role === 'masterOfUnivers';
  }

  private getUserConnectedIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token || this._jwtHelper.isTokenExpired(token)) {
      console.warn('Token non valide ou expiré!');
      return null;
    }
    const decodedToken = this.decodeToken();
    return decodedToken ? decodedToken._id : null;
  }

  forgotPassword(email: string): Observable<any> {
    return this._http.post(`${this.urlLogin}/forgotPassword`, { email }).pipe(
      catchError((error) => {
        console.error(
          'Erreur lors de l’envoi de l’e-mail de réinitialisation',
          error
        );
        return throwError(() => error);
      })
    );
  }

  reinitializePassword(
    resetToken: string,
    newPassword: string
  ): Observable<any> {
    return this._http
      .post(`${this.urlLogin}/reinitializePassword`, {
        resetToken,
        newPassword,
      })
      .pipe(
        catchError((error) => {
          console.error(
            'Erreur lors de la réinitialisation du mot de passe',
            error
          );
          return throwError(() => error);
        })
      );
  }

  changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Observable<any> {
    return this._http
      .post(`${this.urlLogin}/changePassword`, {
        userId,
        oldPassword,
        newPassword,
      })
      .pipe(
        catchError((error) => {
          console.error('Erreur lors du changement du mot de passe', error);
          return throwError(() => error);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('csrfToken');
    this.userConnected.next(false);
    this.adminConnected.next(false);
    this.userIdSubject.next(null);
    this.messageService.add({
      severity: 'success',
      summary: 'Déconnecté',
      detail: 'Vous avez été déconnecté avec succès.',
      life: 2000,
    });
    this.router.navigate(['/']);
  }
}
