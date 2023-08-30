import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColAdminComponent } from './col-admin.component';

describe('ColAdminComponent', () => {
  let component: ColAdminComponent;
  let fixture: ComponentFixture<ColAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColAdminComponent]
    });
    fixture = TestBed.createComponent(ColAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
