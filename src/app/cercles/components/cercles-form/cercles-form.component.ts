import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-cercles-form',
  templateUrl: './cercles-form.component.html',
  styleUrls: ['./cercles-form.component.css']
})

export class CerclesFormComponent implements OnInit {
  cercleForm!: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.cercleForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      hymne: [''],
      address: ['', [Validators.required, this.objectIdValidator()]],
      description: [''],
      members_ids: this._fb.array([])
    });
  }

  objectIdValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /^[0-9a-fA-F]{24}$/.test(control.value);
      return !valid ? { invalidObjectId: { value: control.value } } : null;
    };
  }
  onSubmit() {
    if (this.cercleForm.valid) {
      const formData = this.cercleForm.value;
      // Appelle ton service pour envoyer les données à l'API
    }
  }

}
