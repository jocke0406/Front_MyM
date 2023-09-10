import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private _router: Router, private _auth: AuthService) { }

  canActivate = () => {
    const decodedToken = this._auth.decodeToken();
    if (!decodedToken || decodedToken.email !== environment.adminEmail || decodedToken.role !== 'masterOfUnivers') {
      this._router.navigate(['/']);
      return false;
    }
    return true;
  }
}


