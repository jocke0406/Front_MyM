import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-events-form',
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.css']
})
export class EventsFormComponent implements OnInit {
  eventForm!: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    const startAtControl = new FormControl('', [Validators.required, this.dateGreaterThanTodayValidator()]);
    const endAtControl = new FormControl('', [Validators.required, this.dateGreaterThanStartAtValidator(startAtControl)]);

    this.eventForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      startAt: startAtControl,
      endAt: endAtControl,
      description: [''],
      lieu_id: ['', [Validators.required, this.objectIdValidator()]],
      participants_ids: this._fb.array([], this.objectIdValidator()),
      organizer: ['', [Validators.required, this.objectIdValidator()]]
    });
  }

  objectIdValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /^[0-9a-fA-F]{24}$/.test(control.value);
      return !valid ? { invalidObjectId: { value: control.value } } : null;
    };
  }

  dateGreaterThanTodayValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = new Date(control.value);
      const now = new Date();
      return selectedDate < now ? { dateIsInThePast: true } : null;
    };
  }

  dateGreaterThanStartAtValidator(startControl: AbstractControl): ValidatorFn {
    return (endControl: AbstractControl): { [key: string]: any } | null => {
      const endAt = new Date(endControl.value);
      const startAt = new Date(startControl.value);
      return endAt <= startAt ? { endBeforeStart: true } : null;
    };
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const formData = this.eventForm.value;
      // Appelle ton service pour envoyer les données à l'API
    }
  }
}
