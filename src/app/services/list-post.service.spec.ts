import { TestBed } from '@angular/core/testing';

import { ListPostService } from './list-post.service';

describe('ListPostService', () => {
  let service: ListPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
