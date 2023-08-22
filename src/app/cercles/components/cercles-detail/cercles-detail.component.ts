import { Component, OnInit, OnDestroy } from '@angular/core';
import { CerclesService } from '../../services/cercles.service';
import { Cercle } from '../../models/cercle';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cercles-detail',
  templateUrl: './cercles-detail.component.html',
  styleUrls: ['./cercles-detail.component.css']
})
export class CerclesDetailComponent implements OnInit, OnDestroy {
  cercle: Cercle | null = null;
  private _unsubscribeAll = new Subject<void>();

  constructor(
    private _cerclesService: CerclesService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._route.params.pipe(
      switchMap(({ id }) => this._cerclesService.getCerclesOne(id)),
      takeUntil(this._unsubscribeAll)
    ).subscribe({
      next: (data) => {
        this.cercle = data;
        console.log(this.cercle);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
