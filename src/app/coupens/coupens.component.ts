import { Component } from '@angular/core';
import { ProfilepictureupdateService } from '../profilepictureupdate.service';
import { PaymentService } from '../payment.service';
import { Paymentresponse } from '../paymentresponse';
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
    var token: any = this.profile.getprofile()().token;
    var pay;
    this.payment
      .makePaymentRequest(amount, token)
      .subscribe((data) => (pay = data));
    console.log(pay);
  }
}
