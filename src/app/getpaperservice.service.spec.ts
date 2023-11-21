import { TestBed } from '@angular/core/testing';

import { GetpaperserviceService } from './getpaperservice.service';

describe('GetpaperserviceService', () => {
  let service: GetpaperserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetpaperserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
