import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationsService } from '../../services/locations.service';
import { Location } from '../../models/location';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent implements OnInit, OnDestroy {
  public locationsList!: Location[];
  private _unsubscribeAll = new Subject<void>();

  constructor(private _locationService: LocationsService) { }

  ngOnInit(): void {
    this._locationService.getLocationsAll()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (data) => {
          this.locationsList = data.filter((location: Location) => !location.deletedAt);
        },
        error: (error) => {
          console.log(error);
        }
      }

      );
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
