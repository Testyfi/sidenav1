import { Component, OnInit } from '@angular/core';
import { CheckoutpagedataService } from '../checkoutpagedata.service';
import { PaymentService } from '../payment.service';
import { ProfilepictureupdateService } from '../profilepictureupdate.service';
@Component({
  selector: 'app-checkoutpage',
  templateUrl: './checkoutpage.component.html',
  styleUrls: ['./checkoutpage.component.scss'],
})
export class CheckoutpageComponent implements OnInit {
  constructor(
    private checkoutdata: CheckoutpagedataService,
    private payment: PaymentService,
    public profile: ProfilepictureupdateService
  ) {}
  paymentname: string = '';
  paymentamount: number = 0;
  ngOnInit(): void {
    this.paymentname = this.checkoutdata.planname;
    this.paymentamount = this.checkoutdata.planamount;
  }

  makepayrequest(amount: number) {
    console.log('click');
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
      window.location.href = data.data.payment_url;
      console.log(data.data.payment_url);
      //window.open(data.data.payment_url);
      //this.pay.success = data.success;
      //this.pay.code = data.code;
      //this.pay.message = data.message;
      //this.pay.data.payment_url =
      // 'https://mercury-t2.phonepe.com/transact/pg?token=M2UxMmQzYzY3NjYwZjIzOGVmYjg2ZTE2ZWM5ZDQ2YTZhMTk3NmNiNmQyZjdiYmQ1NmM4MGM2MTg4MDk4ODExNjE4YjI1NTgyZTA5OWFlMTM0ZGFjYmU5MjMzOGVhMDBkYTVmZWU4YzNkMTYzZjAxNTQzY2JmN2YwZTBkMzljNWQ5NDphMDMzYjQ3NjRjNDM4ZDI1MDJkOGRmOGQ2Njk1MTA3Nw';
      //return data.data.payment_url;
      //value=data.data.payment_url;
      //this.seturl(data);
      //console.log(this.pay.data.payment_url);
      //window.open();
      //openWindow(this.pay.data.payment_url);
      //window.location.replace(data.data.payment_url);
      // window.location.href = data.data.payment_url;
      //window.location.assign(this.pay.data.payment_url);
      //window.location.href = this.pay.data.payment_url;
      //this.router.navigate([this.pay.data.payment_url]);
      //this.openurl(data.data.payment_url);
    });

    //console.log(this.pay.data.payment_url + '  hellow');
  }
}
