import { Location as AngularLocation } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, catchError, takeUntil, tap } from 'rxjs';
import { Cercle } from 'src/app/cercles/models/cercle';
import { CerclesService } from 'src/app/cercles/services/cercles.service';
import { Location } from 'src/app/locations/models/location';
import { LocationsService } from 'src/app/locations/services/locations.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-events-form',
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.css'],
})
export class EventsFormComponent implements OnInit, OnDestroy {
  eventForm!: FormGroup;
  locations: Location[] = [];
  cercles: Cercle[] = [];
  private _unsubscribeAll = new Subject<void>();
  id: string | null = null;

  constructor(
    private _fb: FormBuilder,
    private _cerclesServices: CerclesService,
    private _locationsServices: LocationsService,
    private _eventsServices: EventsService,
    private _acivatedRoute: ActivatedRoute,
    private _messageService: MessageService,
    private _location: AngularLocation,
    private _router: Router
  ) { }

  ngOnInit(): void {
    const startAtControl = new FormControl('', [
      Validators.required,
      this.dateGreaterThanTodayValidator(),
    ]);
    const endAtControl = new FormControl('', [
      Validators.required,
      this.dateGreaterThanStartAtValidator(startAtControl),
    ]);

    this.eventForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      startAt: startAtControl,
      endAt: endAtControl,
      description: [''],
      lieu_id: ['', [Validators.required, this.objectIdValidator()]],
      organizer: ['', [Validators.required, this.objectIdValidator()]],
    });

    this.id = this._acivatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this._eventsServices
        .getEventOne(this.id)
        .pipe(
          tap((event) => {
            this.eventForm.patchValue(event);
          }),
          catchError((error) => {
            console.error('Houston, nous avons un problème', error);
            this._messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: "Impossible de charger les données de l'événement.",
            });
            throw error;
          }),
          takeUntil(this._unsubscribeAll)
        )
        .subscribe();
    }
    this.loadDropdownData();
  }

  objectIdValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /^[0-9a-fA-F]{24}$/.test(control.value);
      return !valid ? { invalidObjectId: { value: control.value } } : null;
    };
  }

  dateGreaterThanTodayValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = new Date(control.value);
      const now = new Date();
      return selectedDate < now ? { dateIsInThePast: true } : null;
    };
  }

  dateGreaterThanStartAtValidator(startControl: AbstractControl): ValidatorFn {
    return (endControl: AbstractControl): { [key: string]: any } | null => {
      const endAt = new Date(endControl.value);
      const startAt = new Date(startControl.value);
      return endAt <= startAt ? { endBeforeStart: true } : null;
    };
  }

  private loadDropdownData(): void {
    this._cerclesServices
      .getCerclessAll()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (cercles) => {
          this.cercles = cercles.filter((cercle) => !cercle.deletedAt);
        },
        (error) => {
          console.error('Erreur lors du chargement des cercles :', error);
        }
      );

    this._locationsServices
      .getLocationsAll()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (locations) => {
          this.locations = locations.filter((location) => !location.deletedAt);
        },
        (error) => {
          console.error('Erreur lors du chargement des locations :', error);
        }
      );
  }
  save() {
    if (this.eventForm.valid) {
      if (this.id) {
        // Update
        this._eventsServices
          .updateEvent(this.id, this.eventForm.value)
          .pipe(
            tap(() => {
              this._messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Mise à jour réussie !',
                life: 2000,
              });
              this._router.navigate(['/adminEvents']);
            }),
            catchError((error) => {
              console.error('Oups, création échouée', error);
              this._messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Echec de la mise à jour.',
              });
              throw error;
            }),
            takeUntil(this._unsubscribeAll)
          )
          .subscribe();
      } else {
        // Create
        this._eventsServices
          .submitEvent(this.eventForm.value)
          .pipe(
            tap(() => {
              this._messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Création réussie !',
                life: 2000,
              });
              this._router.navigate(['/adminEvents']);
            }),
            catchError((error) => {
              console.error('Oups, création échouée', error);
              this._messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Création échouée.',
              });
              throw error;
            }),
            takeUntil(this._unsubscribeAll)
          )
          .subscribe();
      }
    } else {
      console.warn('Formulaire non valide');
      this._messageService.add({
        severity: 'warn',
        summary: 'Attention',
        detail: 'Formulaire non valide.',
      });
    }
  }

  goBack() {
    this._location.back();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
