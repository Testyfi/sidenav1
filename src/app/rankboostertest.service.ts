import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RankboostertestService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8080/rankbooster/pasttest';
  getpasttest(tag: string): Observable<any> {
    // console.log(token);

    const body = {
      tag: tag,
    };
    var htrs = this.http.post<any>(this.apiUrl, body, {
      headers: this.getHeader(),
    });
    //console.log(htrs);
    return htrs;
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
