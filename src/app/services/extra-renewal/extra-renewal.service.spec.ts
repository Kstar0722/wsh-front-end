import { TestBed, inject } from '@angular/core/testing';

import { ExtraRenewalService } from './extra-renewal.service';

describe('ExtraRenewalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExtraRenewalService]
    });
  });

  it('should be created', inject([ExtraRenewalService], (service: ExtraRenewalService) => {
    expect(service).toBeTruthy();
  }));
});
