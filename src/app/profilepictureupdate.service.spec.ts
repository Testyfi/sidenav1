import { TestBed } from '@angular/core/testing';

import { ProfilepictureupdateService } from './profilepictureupdate.service';

describe('ProfilepictureupdateService', () => {
  let service: ProfilepictureupdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilepictureupdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
