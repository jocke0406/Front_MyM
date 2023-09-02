import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cercle } from 'src/app/cercles/models/cercle';
import { CerclesService } from 'src/app/cercles/services/cercles.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-cercles',
  templateUrl: './admin-cercles.component.html',
  styleUrls: ['./admin-cercles.component.css']
})
export class AdminCerclesComponent implements OnInit, OnDestroy {
  cerclesList!: Cercle[];
  private _unsubscribeAll = new Subject<void>();

  constructor(private _cerclesService: CerclesService, private _messageService: MessageService) { };
  ngOnInit(): void {
    this._cerclesService.getCerclessAll()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (data) => {
          this.cerclesList = data.filter((cercle: Cercle) => !cercle.deletedAt);
        },
        error: (error) => {
          console.log("Erreur lors du chargement des cercles :", error);
        }
      });
  }

  deleteCercle(cercleId: string): void {
    this._cerclesService.deleteCercle(cercleId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: () => {
          this._messageService.add({ severity: 'success', summary: 'Succès', detail: 'Endroit supprimé avec succès' });
          this.refreshCercles();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du cercle, détails :', error);
          this._messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s\'est produite lors de la suppression du Cercle' });
        }
      });
  }

  refreshCercles(): void {
    this._cerclesService.getCerclessAll()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (cercles: Cercle[]) => {
          this.cerclesList = cercles.filter(cercle => !cercle.deletedAt);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des cercles, détails:', error);
          this._messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s\'est produite lors de la mise à jour de la liste' });

        }
      });
  }

  sortCerclesByName(): void {

  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
