import { TestBed } from '@angular/core/testing';

import { MajorContestService } from './major-contest.service';

describe('MajorContestService', () => {
  let service: MajorContestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MajorContestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
