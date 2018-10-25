import { TestBed, inject } from '@angular/core/testing';

import { LotteryResultsService } from './lottery-results.service';

describe('LotteryResultsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LotteryResultsService]
    });
  });

  it('should be created', inject([LotteryResultsService], (service: LotteryResultsService) => {
    expect(service).toBeTruthy();
  }));
});
