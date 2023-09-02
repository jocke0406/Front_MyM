import { Component, OnInit } from '@angular/core';
import { FormBuilder, ValidatorFn, AbstractControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this._fb.group({
      name: this._fb.group({
        first: ['', [Validators.required, Validators.pattern("[a-zA-ZÀ-ÿ-' ]+"), Validators.maxLength(50)]],
        last: ['', [Validators.required, Validators.pattern("[a-zA-ZÀ-ÿ-' ]+"), Validators.maxLength(50)]]
      }),
      pseudo: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['user', [Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.minLength(8)]],
      address: this._fb.group({
        street: ['', [Validators.required]],
        nbr: ['', [Validators.maxLength(6)]],
        box: ['', [Validators.maxLength(6)]],
        postCode: ['', [Validators.required, Validators.maxLength(6)]],
        city: ['', [Validators.required, Validators.maxLength(30)]],
        country: ['', [Validators.maxLength(30)]]
      }),
      dateOfBirth: ['', [Validators.required, this.dateOfBirthValidator]],
      phone: ['', [Validators.maxLength(12), Validators.pattern(/^\d{0,12}$/)]],
      photo: [''],
      study: this._fb.group({
        studyField: ['', [Validators.maxLength(200)]],
        year: ['', [Validators.maxLength(2)]],
        photo: [''],
      }),
      cap: this._fb.group({
        hasCap: [false],
        provider: [''],
        deliveryDate: ['', this.pastDateValidator],
        goldStars: ['', [Validators.maxLength(1)]],
        silverStars: ['', [Validators.maxLength(1)]],
        comments: ['', [Validators.maxLength(500)]],
      }),
      student_association: this._fb.group({
        member: [false],
        association_id: ['', this.objectIdValidator()],
        function: ['', [Validators.maxLength(50)]]
      }),
      friends: this._fb.array([]),
      geolocalisation: this._fb.group({
        latitude: ['', [Validators.pattern(/^[-+]?[0-9]*\.?[0-9]+$/)]],
        longitude: ['', [Validators.pattern(/^[-+]?[0-9]*\.?[0-9]+$/)]],
        precision: ['', [Validators.pattern(/^[-+]?[0-9]*\.?[0-9]+$/)]]
      }),





    }, { validators: [this.matchPasswords] });
  }
  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      // Appelle ton service pour envoyer les données à l'API
    }
  }

  dateOfBirthValidator(controle: AbstractControl): ValidationErrors | null {
    const dateOfBirth = new Date(controle.value);
    const age = new Date().getFullYear() - dateOfBirth.getFullYear();
    if (age < 16) {
      return { tropJeune: true }
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

  matchPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { notSame: true };
  }

}
