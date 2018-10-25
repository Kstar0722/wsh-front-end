import { TestBed, inject } from '@angular/core/testing';

import { MyReferralsService } from './my-referrals.service';

describe('MyReferralsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyReferralsService]
    });
  });

  it('should be created', inject([MyReferralsService], (service: MyReferralsService) => {
    expect(service).toBeTruthy();
  }));
});
