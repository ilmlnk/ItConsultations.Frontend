import { TestBed } from '@angular/core/testing';

import { LandingContentService } from './landing-content.service';

describe('LandingContentService', () => {
  let service: LandingContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandingContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
