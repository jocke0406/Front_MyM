import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private _authService: AuthService, private router: Router) { }
  canActivate = () => {
    if (!this._authService.userConnected$) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
