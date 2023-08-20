import { TestBed } from '@angular/core/testing';

import { CerclesService } from './cercles.service';

describe('CerclesService', () => {
  let service: CerclesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CerclesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
