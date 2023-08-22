import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { LocationsService } from '../../services/locations.service';
import { Location } from '../../models/location';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-locations-detail',
  templateUrl: './locations-detail.component.html',
  styleUrls: ['./locations-detail.component.css']
})
export class LocationsDetailComponent implements OnInit, OnDestroy {
  location: Location | null = null;
  private _unsubscribeAll = new Subject<void>();

  constructor(
    private _locationsService: LocationsService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._route.params.pipe(
      switchMap(({ id }) => this._locationsService.getLocationFull(id)),
      takeUntil(this._unsubscribeAll)
    ).subscribe({
      next: (data) => {
        this.location = data[0];
        console.log(this.location);
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
