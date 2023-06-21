import { TestBed } from '@angular/core/testing';

import { Pur0310mService } from './pur0310m.service';

describe('Pur0310mService', () => {
  let service: Pur0310mService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pur0310mService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
