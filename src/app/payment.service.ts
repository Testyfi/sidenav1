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
  makePaymentRequest(amount: number): Observable<Paymentresponse> {
    const headers = new HttpHeaders({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImVudGFuZ2xlc29mdHdhcmVAZ21haWwuY29tIiwiRmlyc3RfbmFtZSI6IlRlc3QiLCJMYXN0X25hbWUiOiJUZXN0IiwiVWlkIjoiNjRlMWY4ODg3YmZmNzcyOWVmZjA0ZTg4IiwiZXhwIjoxNjk4NjQ0NDE1fQ.VwibHtKDZmIBGuBLhqsXva4C7VtEPLHoBVzN9_uhb30',
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
