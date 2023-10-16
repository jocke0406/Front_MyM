import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, catchError, takeUntil, tap } from 'rxjs';
import { Location } from 'src/app/locations/models/location';
import { LocationsService } from 'src/app/locations/services/locations.service';
import { CerclesService } from '../../services/cercles.service';

@Component({
  selector: 'app-cercles-form',
  templateUrl: './cercles-form.component.html',
  styleUrls: ['./cercles-form.component.css']
})

export class CerclesFormComponent implements OnInit, OnDestroy {
  cercleForm!: FormGroup;
  locations!: Location[];
  id: string | null = null;
  private _unsubscribeAll = new Subject<void>();

  constructor(private _fb: FormBuilder, private _locationsService: LocationsService,
    private _cerclesService: CerclesService, private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _messageService: MessageService) { }

  ngOnInit(): void {

    this.cercleForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      hymne: ['', [Validators.required, Validators.maxLength(1000)]],
      address: ['', [Validators.required, this.objectIdValidator()]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
    });
    this.getLocations();
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this._cerclesService.getCerclesOne(this.id)
        .pipe(

          tap((cercle) => {
            this.cercleForm.patchValue(cercle);
          }),
          catchError((error) => {
            console.error("Houston, nous avons un problème", error);
            this._messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les données du cercle.' });
            throw error;
          }), takeUntil(this._unsubscribeAll)
        )
        .subscribe();
    }
  }



  objectIdValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /^[0-9a-fA-F]{24}$/.test(control.value);
      return !valid ? { invalidObjectId: { value: control.value } } : null;
    };
  }

  getLocations(): void {
    this._locationsService.getLocationsAll()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (data) => {
          this.locations = data.map(location => ({ ...location, name: location.name, id: location._id }));
        },
        (error) => {
          console.error("Oups, il y a eu un problème : ", error);
        }
      );
  }

  save() {
    if (this.cercleForm.valid) {
      if (this.id) {
        // Update
        this._cerclesService.updateCercle(this.id, this.cercleForm.value)
          .pipe(
            tap(() => {
              this._messageService.add({ severity: 'success', summary: 'Succès', detail: 'Mise à jour réussie !', life: 2000 });
              this._router.navigate(['/adminCercles']);
            }),
            catchError((error) => {

              console.error("Oups, création échouée", error);
              this._messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Echec de la mise à jour.' });
              throw error;
            }), takeUntil(this._unsubscribeAll)
          ).subscribe();
      } else {
        // Create
        this._cerclesService.submitCercleLocation(this.cercleForm.value)
          .pipe(
            tap(() => {
              this._messageService.add({ severity: 'success', summary: 'Succès', detail: 'Création réussie !', life: 2000 });
              this._router.navigate(['/adminCercles']);
            }),
            catchError((error) => {

              console.error("Oups, création échouée", error);
              this._messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Création échouée.' });
              throw error;
            }), takeUntil(this._unsubscribeAll),
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
