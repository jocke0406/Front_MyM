import { Location as AngularLocation } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Cercle } from '../../models/cercle';
import { CerclesService } from '../../services/cercles.service';

@Component({
  selector: 'app-cercles-detail',
  templateUrl: './cercles-detail.component.html',
  styleUrls: ['./cercles-detail.component.css'],
})
export class CerclesDetailComponent implements OnInit, OnDestroy {
  cercle!: Cercle;
  showMembers: boolean = false;
  showEvents: boolean = false;
  cercleMembers!: Cercle;
  eventsDetails!: Cercle;
  cercleLocation: Cercle | null = null;

  private _unsubscribeAll = new Subject<void>();

  constructor(
    private _cerclesService: CerclesService,
    private _location: AngularLocation,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._route.params
      .pipe(
        switchMap(({ id }) => this._cerclesService.getCerclesOne(id)),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe({
        next: (data) => {
          this.cercle = data;
          if (this.cercle.address) {
            this.loadCercleAdress();
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  toggleMembers(): void {
    this.showMembers = !this.showMembers;
    if (this.showMembers) {
      this.loadCercleMembers();
    }
  }

  loadCercleMembers(): void {
    this._cerclesService
      .getCerclesMembers(this.cercle._id!)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (data: Cercle) => {
          this.cercleMembers = data;
        },
        error: (error) => {
          console.error(
            'Erreur lors du chargement des détails des membres:',
            error
          );
        },
      });
  }

  loadCercleEvents(): void {
    this._cerclesService
      .getCercleEvents(this.cercle._id!)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (data: Cercle[]) => {
          this.eventsDetails = data[0];
          console.log('Détails des events chargés avec succès!', data);
        },
        error: (error) => {
          console.error(
            'Erreur lors du chargement des détails des events:',
            error
          );
        },
      });
  }

  toggleEvents() {
    this.showEvents = !this.showEvents;
    if (this.showEvents) {
      this.loadCercleEvents();
    }
  }

  loadCercleAdress(): void {
    this._cerclesService
      .getCercleLocation(this.cercle._id!)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (data: Cercle) => {
          this.cercleLocation = data;
          console.log('Détails adresse chargés avec succès!', data);
        },
        error: (error) => {
          console.error('Erreur lors du chargement adresse :', error);
        },
      });
  }

  getStudyYearLabel(year: number): string {
    if (year) {
      const yearMap: Record<number, string> = {
        1: 'Bachelier 1',
        2: 'Bachelier 2',
        3: 'Bachelier 3',
        4: 'Master 1',
        5: 'Master 2',
        6: 'Master 3',
        7: 'Doctorat',
        8: 'Diplomé',
      };
      return yearMap[year] || 'N/A';
    }

    return 'N/A';
  }

  goBack() {
    this._location.back();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
