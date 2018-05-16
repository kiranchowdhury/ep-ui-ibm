import { TestBed, inject } from '@angular/core/testing';

import { ManageCriteriaService } from './manage-criteria.service';

describe('ManageCriteriaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageCriteriaService]
    });
  });

  it('should be created', inject([ManageCriteriaService], (service: ManageCriteriaService) => {
    expect(service).toBeTruthy();
  }));
});
