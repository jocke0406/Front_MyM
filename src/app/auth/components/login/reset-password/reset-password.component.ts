import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  resetPasswordForm!: FormGroup;
  resetToken!: string | null;
  private _unsubscribeAll = new Subject<void>();

  constructor(
    private _messageService: MessageService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this.resetToken = this._route.snapshot.queryParamMap.get('resetToken');
    console.log('resetToken = ', this.resetToken);
    this.resetPasswordForm = this._fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.matchPasswords }
    );
  }

  matchPasswords(control: AbstractControl): { [key: string]: boolean } | null {
    const group = control as FormGroup;
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { notSame: true };
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid && this.resetToken) {
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;

      this._auth
        .reinitializePassword(this.resetToken, newPassword)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe({
          next: (response) => {
            this._messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: response.message,
              life: 2000,
            });
            this._router.navigate(['/login']);
          },
          error: (error) => {
            this._messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: error.error.message,
              life: 2000,
            });
            this._router.navigate(['/login']);
          },
        });
    }
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
