import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsFormComponent } from './locations-form.component';

describe('LocationsFormComponent', () => {
  let component: LocationsFormComponent;
  let fixture: ComponentFixture<LocationsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationsFormComponent]
    });
    fixture = TestBed.createComponent(LocationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
