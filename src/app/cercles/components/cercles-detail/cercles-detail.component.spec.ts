import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerclesDetailComponent } from './cercles-detail.component';

describe('CerclesDetailComponent', () => {
  let component: CerclesDetailComponent;
  let fixture: ComponentFixture<CerclesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CerclesDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CerclesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
