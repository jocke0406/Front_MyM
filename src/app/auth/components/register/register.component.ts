import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, catchError, of, takeUntil, tap } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Cercle } from 'src/app/cercles/models/cercle';
import { CerclesService } from 'src/app/cercles/services/cercles.service';
import { User } from 'src/app/users/models/user';
import { UsersService } from 'src/app/users/services/users.service';
import { AuthService } from '../../auth.service';
import { Location as AngularLocation } from '@angular/common'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registrationForm!: FormGroup;
  private _unsubscribeAll = new Subject<void>();
  cerclesList!: Cercle[];
  id: string | null = null;

  constructor(
    private _usersService: UsersService,
    private _route: Router,
    private _messageService: MessageService,
    private _fb: FormBuilder,
    private _cerclesService: CerclesService,
    private _auth: AuthService,
    private _location: AngularLocation
  ) { }

  ngOnInit(): void {
    this._auth.userConnectedId$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((id) => {
        if (id) {
          this.id = id;
        }
      });

    this.registrationForm = this._fb.group({
      name: this._fb.group({
        first: [
          '',
          [
            Validators.required,
            Validators.pattern("[a-zA-ZÀ-ÿ-' ]+"),
            Validators.maxLength(50),
          ],
        ],
        last: [
          '',
          [
            Validators.required,
            Validators.pattern("[a-zA-ZÀ-ÿ-' ]+"),
            Validators.maxLength(50),
          ],
        ],
      }),
      pseudo: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['user', [Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.minLength(8)]],
      dateOfBirth: ['', [Validators.required, this.dateOfBirthValidator]],
      photo: ['photo'],
      study: this._fb.group({
        studyField: ['', [Validators.maxLength(200), Validators.required]],
        year: ['', [Validators.maxLength(1), Validators.required]],
      }),
      cap: this._fb.group({
        hasCap: ['false'],
        provider: ['NR'],
        goldStars: ['0', [Validators.maxLength(1)]],
        silverStars: ['0', [Validators.maxLength(1)]],
      }),
      student_association: this._fb.group({
        member: ['false'],
        association_id: ['000000000000000000000000', this.objectIdValidator()],
        function: ['NR', [Validators.maxLength(50)]],
      }),
    });

    this.registrationForm.setValidators([this.matchPasswords]);

    this._cerclesService
      .getCerclessAll()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (data) => {
          this.cerclesList = data;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des cercles:', error);
        },
      });

    if (this.id) {
      this._usersService
        .getUsersOne(this.id)
        .pipe(
          tap((user) => {
            this.registrationForm.patchValue({
              ...user,
              confirmPassword: user.password,
            });
          }),
          catchError((error) => {
            console.error('Houston, nous avons un problème', error);
            this._messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Impossible de charger les données du user.',
            });
            throw error;
          }),
          takeUntil(this._unsubscribeAll)
        )
        .subscribe();
    }
  }

  dateOfBirthValidator(controle: AbstractControl): ValidationErrors | null {
    const dateOfBirth = new Date(controle.value);
    const age = new Date().getFullYear() - dateOfBirth.getFullYear();
    if (age < 16) {
      return { tropJeune: true };
    }
    return null;
  }
  pastDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const now = new Date();
    if (selectedDate > now) {
      return { futureDate: true };
    }
    return null;
  }
  objectIdValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /^[0-9a-fA-F]{24}$/.test(control.value);
      return !valid ? { invalidObjectId: { value: control.value } } : null;
    };
  }

  matchPasswords(control: AbstractControl): { [key: string]: boolean } | null {
    const group = control as FormGroup;
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { notSame: true };
  }

  save() {
    if (this.registrationForm.valid) {
      const formData: User = { ...this.registrationForm.value };
      delete formData.confirmPassword;
      if (this.id) {
        delete formData.password;
        this._auth
          .updateUser(this.id, formData)
          .pipe(
            tap(() => {
              this._messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Mise à jour réussie !',
                life: 2000,
              });
            }),
            catchError((error) => {
              console.error('Oups, mise à jour échouée', error);
              this._messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Mise à jour échouée.',
              });
              return of(null);
            }),
            delay(2010),
            tap(() => {
              this._route.navigate(['/']);
            }),
            takeUntil(this._unsubscribeAll)
          )
          .subscribe();
      } else {
        this._auth
          .submitUser(formData)
          .pipe(
            tap(() => {
              this._messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Création réussie ! Tu peux à présent te connecter',
              });
            }),
            catchError((error) => {
              console.error('Oups, création échouée', error);
              let detailMessage = 'Oups, création échouée';
              if (error.status === 400 && error.error.message) {
                detailMessage = 'Un utilisateur avec cet email existe déjà.';
              }
              this._messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: detailMessage,
              });
              return of(null);
            }),
            delay(2010),
            tap(() => {
              this._route.navigate(['/']);
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

  goodBy() {
    if (this.id) {
      this._auth.deleteUser(this.id)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe({
          next: (response) => {
            this._messageService.add({ severity: 'success', summary: 'Succès', detail: 'Plus des notres !' });
            this._auth.logout();
          },
          error: (error) => {
            this._messageService.add({ severity: 'error', summary: 'Erreur', detail: error.message || 'Une erreur est survenue' });
          }
        });
    }

  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  studyFields: string[] = [
    'Art de bâtir et urbanisme',
    'Arts du spectacle et technique de diffusion et de communication',
    'Criminologie',
    "Histoire, histoire de l'art et archéologie",
    'Information et communication',
    'Langues, lettres et traductologie',
    'Philosophie',
    'Sciences',
    'Sciences agronomiques et ingénierie biologique',
    'Sciences biomédicales et pharmaceutiques',
    "Sciences de l'ingénieur et technologie",
    'Sciences de la motricité',
    'Sciences de la santé publique',
    'Sciences dentaires',
    'Sciences juridiques',
    'Sciences médicales',
    'Sciences politiques et sociales',
    'Sciences psychologiques',
    'Sciences vétérinaires',
    'Sciences économiques et de gestion',
    'Théologie',
    'Pas encore étudiant',
    'Etudes terminées',
    'Ca te regarde pas !',
  ];

  years: any[] = [
    { label: 'Bachelier 1', value: '1' },
    { label: 'Bachelier 2', value: '2' },
    { label: 'Bachelier 3', value: '3' },
    { label: 'Master 1', value: '4' },
    { label: 'Master 2', value: '5' },
    { label: 'Master 3', value: '6' },
    { label: 'Doctorat', value: '7' },
    { label: 'Diplomé', value: '8' },
  ];
  stars = Array.from({ length: 10 }, (_, i) => ({
    label: String(i),
    value: i,
  }));

  functionsList: string[] = [
    'Grand-Maître',
    'Président',
    'Vice-Président',
    'Secrétaire',
    'Trésorier',
    'Memebres',
  ];
}
