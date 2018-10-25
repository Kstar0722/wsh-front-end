import { TestBed, inject } from '@angular/core/testing';

import { PlansService } from './plans.service';

describe('PlansService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlansService]
    });
  });

  it('should be created', inject([PlansService], (service: PlansService) => {
    expect(service).toBeTruthy();
  }));
});
