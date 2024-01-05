import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: HttpClient) {}
  dps1: any = [];
  dps2: any = [];
  dps3: any = [];
  dps4: any = [];
  Data: any = [];
  statistics() {
    const body = {};
    this.http
      .post<any>(`${environment.backend}/statistics/userstatistics`, body, {
        headers: this.getHeader(),
      })
      .subscribe((data) => {
        this.Data = data.data;
        this.dps1 = [];
        this.dps2 = [];
        this.dps3 = [];
        this.dps4 = [];
        for (let i = 0; i < this.Data.length; i++) {
          //console.log('working');
          let s = this.Data[i].date.split('/');
          //console.log(s);

          let maxscore = this.Data[i].maxscore;

          this.dps1.push({
            x: new Date(Number(s[0]), Number(s[1]) - 1, Number(s[2])),
            y: Number(maxscore),
          });
        }
        for (let i = 0; i < this.Data.length; i++) {
          // console.log('working');
          let s = this.Data[i].date.split('/');
          // console.log(new Date(Number(s[0]), Number(s[1]), Number(s[2])));
          let maxscore = this.Data[i].maxscore;
          let userscore = this.Data[i].userscore;
          this.dps2.push({
            x: new Date(Number(s[0]), Number(s[1]) - 1, Number(s[2])),
            y: Number(userscore),
            MaxScore: Number(maxscore),
          });
          //{ x: new Date(2022, 8, 1), y: 300, MaxScore: 360 },
        }
        for (let i = 0; i < this.Data.length; i++) {
          // console.log('working');
          let s = this.Data[i].date.split('/');
          // console.log(new Date(Number(s[0]), Number(s[1]), Number(s[2])));
          // let maxscore = this.Data[i].maxscore;
          let userrank = this.Data[i].userrank;
          this.dps3.push({
            x: new Date(Number(s[0]), Number(s[1]) - 1, Number(s[2])),
            y: Number(userrank),
          });
          //{ x: new Date(2022, 8, 1), y: 300, MaxScore: 360 },
        }
        for (let i = 0; i < this.Data.length; i++) {
          // console.log('working');
          let s = this.Data[i].date.split('/');
          // console.log(new Date(Number(s[0]), Number(s[1]), Number(s[2])));
          // let maxscore = this.Data[i].maxscore;
          let totaluser = this.Data[i].totaluser;
          this.dps4.push({
            x: new Date(Number(s[0]), Number(s[1]) - 1, Number(s[2])),
            y: Number(totaluser),
          });
          //{ x: new Date(2022, 8, 1), y: 300, MaxScore: 360 },
        }
        //console.log(this.dps1);
        this.setsort();
      });
    //console.log(htrs);
  }
  getHeader() {
    let str: any = '';
    str = localStorage.getItem('token');

    let response = JSON.parse(str);
    const token: string = response.token;
    //console.log(response.token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }
  setsort() {
    this.dps1.sort((a: any, b: any) => a.x.getTime() - b.x.getTime());
    this.dps2.sort((a: any, b: any) => a.x.getTime() - b.x.getTime());
    this.dps3.sort((a: any, b: any) => a.x.getTime() - b.x.getTime());
    this.dps4.sort((a: any, b: any) => a.x.getTime() - b.x.getTime());
  }
}
