import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, ValidatorFn, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-locations-form',
  templateUrl: './locations-form.component.html',
  styleUrls: ['./locations-form.component.css']
})
export class LocationsFormComponent implements OnInit {
  locationForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.locationForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ]+'), Validators.maxLength(100)]],
      address: this.fb.group({
        street: ['', [Validators.required, Validators.maxLength(200)]],
        nbr: ['', Validators.maxLength(5)],
        postCode: ['', [Validators.required, Validators.maxLength(6)]],
        city: ['', [Validators.required, Validators.maxLength(100)]],
        district: ['', Validators.maxLength(100)],
        country: ['', Validators.maxLength(100)]
      }),
      geolocalisation: this.fb.group({
        latitude: ['', [Validators.pattern(/^[-+]?[0-9]*\.?[0-9]+$/)]],
        longitude: ['', [Validators.pattern(/^[-+]?[0-9]*\.?[0-9]+$/)]],
        precision: ['', [Validators.pattern(/^[-+]?[0-9]*\.?[0-9]+$/)]]
      }),
      eventsId: this.fb.array([]),
    });
  }

  onSubmit() {
    if (this.locationForm.valid) {
      const formData = this.locationForm.value;
      // Appelle ton service pour envoyer les données à l'API
    }
  }


}
