import { TestBed, inject } from '@angular/core/testing';

import { TouchService } from './touch.service';

describe('TouchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TouchService]
    });
  });

  it('should be created', inject([TouchService], (service: TouchService) => {
    expect(service).toBeTruthy();
  }));
});
