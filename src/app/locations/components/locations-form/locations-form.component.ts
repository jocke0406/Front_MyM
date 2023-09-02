import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationsService } from '../../services/locations.service';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-locations-form',
  templateUrl: './locations-form.component.html',
  styleUrls: ['./locations-form.component.css']
})

export class LocationsFormComponent implements OnInit, OnDestroy {

  locationForm!: FormGroup;
  id: string | null = null;
  private _unsubscribeAll = new Subject<void>();

  constructor(private fb: FormBuilder, private _LocationsService: LocationsService,
    private _activatedRoute: ActivatedRoute, private _router: Router, private _messageService: MessageService,) { }

  ngOnInit(): void {
    this.locationForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-ZÀ-ÿ-' ]+"), Validators.maxLength(100)]],
      address: this.fb.group({
        street: ['', [Validators.required, Validators.maxLength(200)]],
        nbr: ['', [Validators.required, Validators.maxLength(5), Validators.pattern('[0-9/]+')]],
        postCode: ['', [Validators.required, Validators.maxLength(6)]],
        city: ['', [Validators.required, Validators.maxLength(100)]],
        district: ['NR', Validators.maxLength(100)],
        country: ['Belgium', Validators.maxLength(100)]
      }),
      geolocalisation: this.fb.group({
        latitude: ['0', [Validators.pattern(/^[-+]?[0-9]*\.?[0-9]+$/)]],
        longitude: ['0', [Validators.pattern(/^[-+]?[0-9]*\.?[0-9]+$/)]],
        precision: ['0', [Validators.pattern(/^[-+]?[0-9]*\.?[0-9]+$/)]]
      }),
    });

    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this._LocationsService.getLocationOne(this.id)
        .pipe(

          tap((location) => {
            this.locationForm.patchValue(location);
          }),
          catchError((error) => {
            console.error("Quelque chose s'est mal passé", error);
            this._messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les données de la location.' });
            throw error;
          }),
          takeUntil(this._unsubscribeAll)
        )
        .subscribe();
    }
  }

  save() {
    if (this.locationForm.valid) {
      if (this.id) {
        // Update
        this._LocationsService.updateLocation(this.id, this.locationForm.value)
          .pipe(
            tap(() => {
              this._messageService.add({ severity: 'success', summary: 'Succès', detail: 'Mise à jour réussie !', life: 2000 });
              this._router.navigate(['/adminLocations']);

            }),
            catchError((error) => {

              console.error("Oups, création échouée", error);
              this._messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Echec de la mise à jour.' });
              throw error;
            }), takeUntil(this._unsubscribeAll),
          ).subscribe();
      } else {
        // Create
        this._LocationsService.submitFormLocation(this.locationForm.value)
          .pipe(
            tap(() => {
              this._messageService.add({ severity: 'success', summary: 'Succès', detail: 'Création réussie !', life: 2000 });
              this._router.navigate(['/adminLocations']);

            }),
            catchError((error) => {

              console.error("Oups, création échouée", error);
              this._messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Création échouée.' });
              throw error;
            }), takeUntil(this._unsubscribeAll)
          ).subscribe();
      }
    } else {
      console.warn("Formulaire non valide");
      this._messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Formulaire non valide.' });
    }
  }




  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
