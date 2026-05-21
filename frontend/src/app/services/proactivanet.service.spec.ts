import { TestBed } from '@angular/core/testing';

import { ProactivanetService } from './proactivanet.service';

describe('ProactivanetService', () => {
  let service: ProactivanetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProactivanetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
