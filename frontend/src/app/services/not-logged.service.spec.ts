import { TestBed, inject } from '@angular/core/testing';

import { NotLoggedService } from './not-logged.service';

describe('NotLoggedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotLoggedService]
    });
  });

  it('should be created', inject([NotLoggedService], (service: NotLoggedService) => {
    expect(service).toBeTruthy();
  }));
});
