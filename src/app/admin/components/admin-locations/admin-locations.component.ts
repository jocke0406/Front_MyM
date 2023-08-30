import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationsService } from '../../../locations/services/locations.service'
import { Location } from 'src/app/locations/models/location';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin-locations',
  templateUrl: './admin-locations.component.html',
  styleUrls: ['./admin-locations.component.css']
})
export class AdminLocationsComponent implements OnInit, OnDestroy {

  private _unsubscribeAll = new Subject<void>();
  locationsList!: Location[];

  constructor(private _locationsService: LocationsService) { }

  ngOnInit(): void {
    this._locationsService.getLocationsAll()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (data) => {
          this.locationsList = data.filter((location: Location) => !location.deletedAt);
        },
        error: (error) => {
          console.log("Erreur lors du chargement des locations :", error);
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
