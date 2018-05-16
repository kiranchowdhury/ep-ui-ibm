import { TestBed, inject } from '@angular/core/testing';

import { CustomHeaderService } from './custom-header.service';

describe('CustomHeaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomHeaderService]
    });
  });

  it('should be created', inject([CustomHeaderService], (service: CustomHeaderService) => {
    expect(service).toBeTruthy();
  }));
});
