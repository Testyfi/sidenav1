import { Component, OnInit } from '@angular/core';
import { courses } from './courses';
import { ResizedEvent } from 'angular-resize-event';
import { combo } from './combo';
import { NONE_TYPE } from '@angular/compiler';
import { ProfilepictureupdateService } from '../profilepictureupdate.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CheckoutpagedataService } from '../checkoutpagedata.service';
import { Time } from '@angular/common';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public profile: ProfilepictureupdateService,
    private router: Router,
    private checkout: CheckoutpagedataService
  ) {}
  courses = courses;
  num: number = 0;
  combo = combo;
  view = false;
  loading = false;
  planstr = '';
  expirydate: any;
  onResized(event: ResizedEvent) {
    this.num = event.newRect.width;
    // console.log(this.num);

    if (this.num < 550) {
      let e: any = document.getElementById('displaycourses');
      e.style.display = 'block';

      // e.style.width = 'auto';
      //console.log("yes");
    } else {
      let e: any = document.getElementById('displaycourses');
      e.style.display = 'flex';
    }
  }
  ngOnInit(): void {
    this.loading = true;
    this.sendrequest();
    this.num = window.innerWidth;

    if (this.num < 550) {
      // let e: any = document.getElementById('displaycourses');
      //e.style.display = 'block';
      let e: any = document.getElementById('displaycourses1');
      e.style.display = 'block';
    } else {
      //  let e: any = document.getElementById('displaycourses');
      // e.style.display = 'flex';
      let e: any = document.getElementById('displaycourses1');
      e.style.display = 'flex';
    }
  }
  sendrequest() {
    const body = {};
    //console.log('i am in');
    this.http
      .post<any>(`${environment.backend}/payment/getuserpaymentdetails`, body, {
        headers: this.getHeader(),
      })
      .subscribe(
        (data) => {
          console.log(data.data);
          this.loading = false;
          if (data.data.success) {
            console.log('success');
            if (data.data.purchaseplan == 0) {
              this.planstr = 'Pro Monthly';
            } else {
              this.planstr = 'Pro Annually';
            }
            this.expirydate = data.data.expiry;
          } else {
            this.view = !this.view;
          }
          //localStorage.setItem('token', JSON.stringify(response));
        },
        (error) => {
          this.loading = false;
          console.log(error);
          alert(error.error);
        }
      );
  }
  createtest = this.profile.getprofile()().purchased;

  buy(id: string) {
    if (id == '1') {
      if (this.profile.getprofile()().wallet >= 200) {
        this.loading = true;

        this.http
          .get(
            `${environment.backend}/users/${
              this.profile.getprofile()().user_id
            }/purchase`,
            { headers: this.getHeader() }
          )
          .subscribe(
            (response) => {
              this.profile.getprofile()().wallet =
                this.profile.getprofile()().wallet - 200;
              let str: any = '';
              str = localStorage.getItem('token');
              localStorage.removeItem('token');
              let res = JSON.parse(str);
              res.wallet = res.wallet - 200;
              localStorage.setItem('token', JSON.stringify(res));
              console.log(response + 'come from server');
              this.loading = false;
              //localStorage.setItem('token', JSON.stringify(response));

              //this.router.navigate(['/dashboard']);
              this.createtest = true;
            },
            (error) => {
              this.loading = false;
              console.log(error);
              alert(error.error);
            }
          );
      } else {
        alert(
          'your Account balance is low please add atleast ' +
            (200 - this.profile.getprofile()().wallet) +
            ' in your wallet'
        );
      }
    }
  }
  getHeader() {
    let str: any = '';
    str = localStorage.getItem('token');

    let response = JSON.parse(str);
    const token: string = response.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }
  start(id: number) {
    if (id == 2) {
      this.checkout.planamount = 199;
      this.checkout.planname = 'Pro Monthly';
    }
    if (id == 3) {
      this.checkout.planamount = 1999;
      this.checkout.planname = 'Pro Annual';
    }
    this.router.navigate(['/checkoutpage']);
  }
}
