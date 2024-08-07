import { Component, OnInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { pasttest } from './pasttest';
import { NONE_TYPE } from '@angular/compiler';
import { ProfilepictureupdateService } from '../profilepictureupdate.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CheckoutpagedataService } from '../checkoutpagedata.service';
import { Time } from '@angular/common';
@Component({
  selector: 'app-pasttest',
  templateUrl: './pasttest.component.html',
  styleUrls: ['./pasttest.component.scss'],
})
export class PasttestComponent {
  constructor(
    private http: HttpClient,
    public profile: ProfilepictureupdateService,
    private router: Router,
    private checkout: CheckoutpagedataService
  ) {}

  num: number = 0;
  pasttest = pasttest;
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

  getHeader() {
    let str: any = '';
    str = localStorage.getItem('token');

    let response = JSON.parse(str);
    const token: string = response.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }
}
