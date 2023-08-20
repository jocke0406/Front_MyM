import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerclesListComponent } from './cercles-list.component';

describe('CerclesListComponent', () => {
  let component: CerclesListComponent;
  let fixture: ComponentFixture<CerclesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CerclesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CerclesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
