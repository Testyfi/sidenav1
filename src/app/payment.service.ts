import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paymentresponse } from './paymentresponse';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://api.testtify.com/payment/phonepay/request';
  makePaymentRequest(
    amount: number,
    token: string
  ): Observable<Paymentresponse> {
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,

      'Content-Type': 'application/json',
    });

    const body = {
      amount: amount,
    };

    return this.http.post<Paymentresponse>(this.apiUrl, body, {
      headers: headers,
    });
  }
}
