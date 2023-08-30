import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCerclesComponent } from './admin-cercles.component';

describe('AdminCerclesComponent', () => {
  let component: AdminCerclesComponent;
  let fixture: ComponentFixture<AdminCerclesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCerclesComponent]
    });
    fixture = TestBed.createComponent(AdminCerclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
