import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _unsubscribeAll = new Subject<void>();
  isUserConnected: boolean = false;
  userConnectedPseudo: string | null = null;
  userConnectedId: string | null = null;

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    this._auth.userConnected$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((status) => {
        this.isUserConnected = status;
        if (this.isUserConnected) {
          const decodeToken = this._auth.decodeToken();
          this.userConnectedPseudo = decodeToken.pseudo;
          this.userConnectedId = decodeToken._id;
        }
      });
  }

  logout() {
    this._auth.logout();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
