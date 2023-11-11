import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-col-admin',
  templateUrl: './col-admin.component.html',
  styleUrls: ['./col-admin.component.css'],
})
export class ColAdminComponent implements OnInit, OnDestroy {
  private _unsubscribeAll = new Subject<void>();
  userConnectedIsAdmin = false;

  constructor(private _auth: AuthService) { }
  ngOnInit(): void {
    this._auth.adminConnected$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((status) => {
        this.userConnectedIsAdmin = status;

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
