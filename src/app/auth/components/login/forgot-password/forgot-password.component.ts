import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnDestroy, OnInit {
  private _unsubscribeAll = new Subject<void>();
  forgotPasswordForm!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;
      this._authService
        .forgotPassword(email)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe({
          next: (response) => {
            this._messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: response.message,
              life: 2000,
            });
          },
          error: (error) => {
            this._messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: error.error.message,
              life: 2000,
            });
          },
        });
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
