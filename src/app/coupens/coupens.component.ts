import { Component } from '@angular/core';
import { ProfilepictureupdateService } from '../profilepictureupdate.service';
import { PaymentService } from '../payment.service';
import { Paymentresponse } from '../paymentresponse';
import { Data } from '../paymentresponse';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-coupens',
  templateUrl: './coupens.component.html',
  styleUrls: ['./coupens.component.scss'],
})
export class CoupensComponent {
  constructor(
    public profile: ProfilepictureupdateService,
    public payment: PaymentService,
    private router: Router,
    public sanitizer: DomSanitizer
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

  makepayrequest(amount: any) {
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

    this.payment.makePaymentRequest(amount, token).subscribe((data) => {
      //console.log(data.data.payment_url);
      this.pay.success = data.success;
      this.pay.code = data.code;
      this.pay.message = data.message;
      this.pay.data.payment_url = data.data.payment_url;
      //return data.data.payment_url;
      //value=data.data.payment_url;
      //this.seturl(data);
      //console.log(this.pay.data.payment_url);
      // window.open(this.pay.data.payment_url, '_blank');
      //window.location.replace(data.data.payment_url);
      // window.location.href = data.data.payment_url;
      //window.location.assign(this.pay.data.payment_url);
      //window.location.href = this.pay.data.payment_url;
      //this.router.navigate([this.pay.data.payment_url]);
      this.openurl(data.data.payment_url);
    });
    //console.log(this.pay.data.payment_url + '  hellow');
    // window.open(
    // 'https://mercury-t2.phonepe.com/transact/pg?token=MjhjZWI4YmU1NzY1ZDE3Yzk4YWViY2Y0ODdmMzA1NWI3MzU2MmNiMzc1YjZkMDBhNmZjMmU4NTMyNzFkNzJiYmIzMjM5OTZlNDkwM2JlODdhMjEwYzQ4ZGUxYzYzYjU0MjNkZWU4ZjQ0MDViOTI4ZmE4OmMxNmU2MWUxMjYwYWQ1YTFlMTk3YmE0ODMxZDAxYmZl'
    //);
  }
  openurl(url: string) {
    window.open(url);
  }
}
