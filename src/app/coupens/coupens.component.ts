import { Component } from '@angular/core';
import { ProfilepictureupdateService } from '../profilepictureupdate.service';
import { PaymentService } from '../payment.service';
import { Paymentresponse } from '../paymentresponse';
import { Data } from '../paymentresponse';
import { Router } from '@angular/router';
@Component({
  selector: 'app-coupens',
  templateUrl: './coupens.component.html',
  styleUrls: ['./coupens.component.scss'],
})
export class CoupensComponent {
  constructor(
    public profile: ProfilepictureupdateService,
    public payment: PaymentService,
    private router: Router
  ) {}
  d: Data = { payment_url: '' };
  pay: Paymentresponse = {
    success: false,
    code: 409,
    message: 'nomessage',
    data: this.d,
  };
  /*
  seturl(data: any) {
    this.pay.code = data.code;
    this.pay.message = data.message;
    this.pay.success = data.success;
    this.pay.data.payment_url = data.data.payment_url;
  }
  */

  async makepayrequest(amount: any) {
    /*
    var pay: Paymentresponse = {
      success: false,
      code: 409,
      message: 'nomessage',
      data: d,
    };
    */

    var token: any = this.profile.getprofile()().token;
    //let value = await Promise;

    await this.payment.makePaymentRequest(amount, token).subscribe((data) => {
      this.pay.success = data.success;
      this.pay.code = data.code;
      this.pay.message = data.message;
      this.pay.data.payment_url = data.data.payment_url;
      //return data.data.payment_url;
      //value=data.data.payment_url;
      //this.seturl(data);
      console.log(this.pay.data.payment_url);
      //window.location.href = data.data.payment_url;
      //window.location.assign(this.pay.data.payment_url);
      //window.location.href = this.pay.data.payment_url;
      //this.router.navigate([this.pay.data.payment_url]);
    });
    //console.log(this.pay.data.payment_url + '  hellow');
  }
}
