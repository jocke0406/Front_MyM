import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  AbstractControlOptions,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  changePasswordForm!: FormGroup;
  userId!: string | null;
  private _unsubscribeAll = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _messageService: MessageService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._authService.userConnectedId$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((id) => {
        this.userId = id;
      });
    const formOptions: AbstractControlOptions = {
      validators: this.passwordMatchingValidator,
    };

    this.changePasswordForm = this._fb.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      formOptions
    );
  }

  passwordMatchingValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const group = control as FormGroup;
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { notMatching: true };
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid && this.userId) {
      const oldPassword = this.changePasswordForm.get('oldPassword')?.value;
      const newPassword = this.changePasswordForm.get('newPassword')?.value;

      this._authService.changePassword(this.userId, oldPassword, newPassword)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe({
          next: (response) => {
            this._messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Mot de passe changé avec succès',
              life: 2000,
            });
            this._authService.logout();
            this._router.navigate(['/login']);
          },
          error: (error) => {
            this._messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: error.error.message,
              life: 2000,
            });
          }
        });

    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
