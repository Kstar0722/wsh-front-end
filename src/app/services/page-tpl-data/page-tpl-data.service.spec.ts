import { TestBed, inject } from '@angular/core/testing';

import { PageTplDataService } from './page-tpl-data.service';

describe('PageTplDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageTplDataService]
    });
  });

  it('should be created', inject([PageTplDataService], (service: PageTplDataService) => {
    expect(service).toBeTruthy();
  }));
});
