import { TestBed, inject } from '@angular/core/testing';

import { TestimonialsService } from './testimonials.service';

describe('TestimonialsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestimonialsService]
    });
  });

  it('should be created', inject([TestimonialsService], (service: TestimonialsService) => {
    expect(service).toBeTruthy();
  }));
});
