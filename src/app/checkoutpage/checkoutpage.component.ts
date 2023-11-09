import { Component } from '@angular/core';
import { CheckoutpagedataService } from '../checkoutpagedata.service';
@Component({
  selector: 'app-checkoutpage',
  templateUrl: './checkoutpage.component.html',
  styleUrls: ['./checkoutpage.component.scss'],
})
export class CheckoutpageComponent {
  constructor(private checkoutdata: CheckoutpagedataService) {}
  paymentname: string = this.checkoutdata.planname;
  paymentamount: number = this.checkoutdata.planamount;
}
