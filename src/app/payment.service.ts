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
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImFudWpteW5AZ21haWwuY29tIiwiRmlyc3RfbmFtZSI6ImFudWoiLCJMYXN0X25hbWUiOiJzaGFybWEiLCJVaWQiOiI2NGUyOTgwMWZmNmE2YTU4NWFlZTAxMDkiLCJleHAiOjE2OTg3MjQzMzl9.E5WWbL-Xoi3ulPjammx5QVqO1WpJWmWaSSANJNVpNR4',
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
