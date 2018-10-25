import { TestBed, inject } from '@angular/core/testing';

import { DateParserService } from './date-parser.service';

describe('DateParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateParserService]
    });
  });

  it('should be created', inject([DateParserService], (service: DateParserService) => {
    expect(service).toBeTruthy();
  }));
});
