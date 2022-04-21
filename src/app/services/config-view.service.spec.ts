import { TestBed } from '@angular/core/testing';

import { ConfigViewService } from './config-view.service';

describe('ConfigViewService', () => {
  let service: ConfigViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
