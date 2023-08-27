import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private _fb: FormBuilder) { }
  registrationForm!: FormGroup;
  ngOnInit(): void {
    this.registrationForm = this._fb.group({
      name: this._fb.group({
        first: ['', [Validators.required, Validators.maxLength(50)]],
        last: ['', [Validators.required, Validators.maxLength(50)]]
      }),
      pseudo: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      // ... autres champs ...
      password: ['', [Validators.required, Validators.minLength(8)]]
      // ... autres champs ...
    });
  }
  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      // Appelle ton service pour envoyer les données à l'API
    }
  }
}
