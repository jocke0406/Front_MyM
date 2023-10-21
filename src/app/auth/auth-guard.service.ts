import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private _authService: AuthService,
    private router: Router,
    private _messageService: MessageService
  ) { }

  canActivate(): Observable<boolean> {
    return this._authService.userConnected$.pipe(
      take(1), // Prend la première valeur émise par l'Observable
      map((isConnected) => {
        if (!isConnected) {
          this._messageService.add({
            severity: 'warn',
            summary: 'Non autorisé',
            detail: 'Connecte toi pour accéder à cette section!',
            life: 2000,
          });
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}
