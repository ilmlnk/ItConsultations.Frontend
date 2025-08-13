import { TestBed } from '@angular/core/testing';

import { DataRefinementService } from './data-refinement.service';

describe('DataRefinementService', () => {
  let service: DataRefinementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataRefinementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
