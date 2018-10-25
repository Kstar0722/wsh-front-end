import { TestBed, inject } from '@angular/core/testing';

import { LotteryPrizesService } from './lottery-prizes.service';

describe('LotteryPrizesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LotteryPrizesService]
    });
  });

  it('should be created', inject([LotteryPrizesService], (service: LotteryPrizesService) => {
    expect(service).toBeTruthy();
  }));
});
