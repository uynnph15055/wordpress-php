import { TestBed } from '@angular/core/testing';

import { GetValueLocalService } from './get-value-local.service';

describe('GetValueLocalService', () => {
  let service: GetValueLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetValueLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
