import { TestBed } from '@angular/core/testing';

import { BasvenmastService } from './basvenmast.service';

describe('BasvenmastService', () => {
  let service: BasvenmastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasvenmastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
