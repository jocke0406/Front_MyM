import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { Location } from 'src/app/locations/models/location';
import { LocationsService } from '../../../locations/services/locations.service';

@Component({
  selector: 'app-admin-locations',
  templateUrl: './admin-locations.component.html',
  styleUrls: ['./admin-locations.component.css']
})
export class AdminLocationsComponent implements OnInit, OnDestroy {

  private _unsubscribeAll = new Subject<void>();
  locationsList!: Location[];

  constructor(private _locationsService: LocationsService, private _messageService: MessageService) { }

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

  deleteLocation(locationId: string): void {
    this._locationsService.deleteLocation(locationId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: () => {
          this._messageService.add({ severity: 'success', summary: 'Succès', detail: 'Endroit supprimé avec succès' });
          this.refreshLocations();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de l\'endroit, détails :', error);
          this._messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s\'est produite lors de la suppression du Cercle' });
        }
      });
  }

  refreshLocations(): void {
    this._locationsService.getLocationsAll()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (locations: Location[]) => {
          this.locationsList = locations.filter(location => !location.deletedAt);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des locations, détails:', error);
          this._messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s\'est produite lors de la mise à jour de la liste' });

        }
      });
  }

  sortLocationsByName(): void {
    this.locationsList.sort((a, b) => {
      if (a.name && b.name && a.name < b.name) {
        return -1;
      }
      if (a.name && b.name && a.name > b.name) {
        return 1;
      }
      return 0;
    })
  }



  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
