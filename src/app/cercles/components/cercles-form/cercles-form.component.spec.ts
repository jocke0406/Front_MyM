import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerclesFormComponent } from './cercles-form.component';

describe('CerclesFormComponent', () => {
  let component: CerclesFormComponent;
  let fixture: ComponentFixture<CerclesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CerclesFormComponent]
    });
    fixture = TestBed.createComponent(CerclesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
