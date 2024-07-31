import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentredirectComponent } from './paymentredirect.component';

describe('PaymentredirectComponent', () => {
  let component: PaymentredirectComponent;
  let fixture: ComponentFixture<PaymentredirectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentredirectComponent]
    });
    fixture = TestBed.createComponent(PaymentredirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
