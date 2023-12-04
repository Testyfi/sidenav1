import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RankboostertestService {
  constructor(private http: HttpClient) {}
  // private apiUrl = 'http://localhost:8080/rankbooster/pasttest';
  getpasttest(tag: string): Observable<any> {
    // console.log(token);

    const body = {
      tag: tag,
    };
    var htrs = this.http.post<any>(
      `${environment.backend}/rankbooster/pasttest`,
      body,
      {
        headers: this.getHeader(),
      }
    );
    //console.log(htrs);
    return htrs;
  }
  getlivetest(tag: string): Observable<any> {
    // console.log(token);

    const body = {
      tag: tag,
    };
    var htrs = this.http.post<any>(
      `${environment.backend}/rankbooster/livetest`,
      body,
      {
        headers: this.getHeader(),
      }
    );
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
