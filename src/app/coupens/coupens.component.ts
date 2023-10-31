import { Component } from '@angular/core';
import { ProfilepictureupdateService } from '../profilepictureupdate.service';
import { PaymentService } from '../payment.service';
import { Paymentresponse } from '../paymentresponse';
import { Data } from '../paymentresponse';
@Component({
  selector: 'app-coupens',
  templateUrl: './coupens.component.html',
  styleUrls: ['./coupens.component.scss'],
})
export class CoupensComponent {
  constructor(
    public profile: ProfilepictureupdateService,
    public payment: PaymentService
  ) {}

  makepayrequest(amount: any) {
    var d: Data = { payment_url: '' };
    var pay: Paymentresponse = {
      success: false,
      code: 409,
      message: 'nomessage',
      data: d,
    };
    var token: any = this.profile.getprofile()().token;
    var pay: Paymentresponse;
    this.payment
      .makePaymentRequest(amount, token)
      .subscribe((data) => console.log(data.data.payment_url));
    console.log(pay.data.payment_url);
  }
}
