import { TestBed } from '@angular/core/testing';

import { CheckoutpagedataService } from './checkoutpagedata.service';

describe('CheckoutpagedataService', () => {
  let service: CheckoutpagedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutpagedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
