import { TestBed, inject } from '@angular/core/testing';

import { StaticContentService } from './static-content.service';

describe('StaticContentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaticContentService]
    });
  });

  it('should be created', inject([StaticContentService], (service: StaticContentService) => {
    expect(service).toBeTruthy();
  }));
});
