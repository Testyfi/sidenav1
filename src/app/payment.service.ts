import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paymentresponse } from './paymentresponse';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}
  //private apiUrl = 'http://localhost:8080/payment/phonepay/request';
  makePaymentRequest(
    amount: number,
    token: string
  ): Observable<Paymentresponse> {
    // console.log(token);

    const body = {
      amount: amount,
    };

    return this.http.post<Paymentresponse>(
      `${environment.backend}/payment/phonepay/request`,
      body,
      {
        headers: this.getHeader(),
      }
    );
  }
  getHeader() {
    let str: any = '';
    str = localStorage.getItem('token');

    let response = JSON.parse(str);
    const token: string = response.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }
}
