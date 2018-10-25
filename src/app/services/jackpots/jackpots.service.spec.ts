import { TestBed, inject } from '@angular/core/testing';

import { JackpotsService } from './jackpots.service';

describe('JackpotsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JackpotsService]
    });
  });

  it('should be created', inject([JackpotsService], (service: JackpotsService) => {
    expect(service).toBeTruthy();
  }));
});
