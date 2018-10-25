import { TestBed, inject } from '@angular/core/testing';

import { UserTrackingService } from './user-tracking.service';

describe('UserTrackingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserTrackingService]
    });
  });

  it('should be created', inject([UserTrackingService], (service: UserTrackingService) => {
    expect(service).toBeTruthy();
  }));
});
