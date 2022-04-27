import { TestBed } from '@angular/core/testing';

import { ConfigFunctionService } from './config-function.service';

describe('ConfigFunctionService', () => {
  let service: ConfigFunctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigFunctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
