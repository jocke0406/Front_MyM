import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationsService } from '../../services/locations.service';
import { Location } from '../../models/location';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent implements OnInit, OnDestroy {
  public locationsList!: Location[];
  private _subscription01!: Subscription;

  constructor(private _locationService: LocationsService) { }

  ngOnInit(): void {
    this._subscription01 = this._locationService.getLocationsAll().subscribe(
      {
        next: (data) => {
          console.log(data);
          this.locationsList = data;
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this._subscription01?.unsubscribe();
  }
}
