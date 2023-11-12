import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, catchError, delay, of, takeUntil, tap } from 'rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private _unsubscribeAll = new Subject<void>();
  loginForm!: FormGroup;
  constructor(
    private _messagesService: MessageService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) { }
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });


  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      this._authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .pipe(
          tap(() => {
            this._messagesService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Connexion réussie!',
              life: 2000,
            });
          }),
          catchError((error) => {
            this._messagesService.add({
              severity: 'error',
              summary: 'Erreur',
              detail:
                error.error.message ||
                "Une erreur s'est produite pendant la connexion.",
            });
            return of(null);
          }),
          delay(2100),
          tap(() => {
            this._router.navigate(['/']);
          }),
          takeUntil(this._unsubscribeAll)
        )
        .subscribe();
    } else {
      this._messagesService.add({
        severity: 'warn',
        summary: 'Attention',
        detail: 'Veuillez remplir correctement le formulaire.',
        life: 2000,
      });
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
