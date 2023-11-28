import { TestBed } from '@angular/core/testing';

import { RankboostertestService } from './rankboostertest.service';

describe('RankboostertestService', () => {
  let service: RankboostertestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankboostertestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
