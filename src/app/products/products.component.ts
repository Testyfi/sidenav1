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
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public profile: ProfilepictureupdateService,
    private router: Router
  ) {}
  courses = courses;
  num: number = 0;
  combo = combo;

  onResized(event: ResizedEvent) {
    this.num = event.newRect.width;
    // console.log(this.num);

    if (this.num < 550) {
      let e: any = document.getElementById('displaycourses');
      e.style.display = 'block';
      e = document.getElementById('displaycourses1');
      e.style.display = 'block';
      e = document.getElementById('allcourses');
      e.style.marginLeft = '20%';
      // e.style.width = 'auto';
      //console.log("yes");
    } else {
      let e: any = document.getElementById('displaycourses');
      e.style.display = 'flex';
      e = document.getElementById('displaycourses1');
      e.style.display = 'flex';
      e = document.getElementById('allcourses');
      e.style = NONE_TYPE;
    }
  }
  ngOnInit(): void {
    this.num = window.innerWidth;
    if (this.num < 550) {
      let e: any = document.getElementById('displaycourses');
      e.style.display = 'block';
      e = document.getElementById('displaycourses1');
      e.style.display = 'block';
    } else {
      let e: any = document.getElementById('displaycourses');
      e.style.display = 'flex';
      e = document.getElementById('displaycourses1');
      e.style.display = 'flex';
      e = document.getElementById('allcourses');
      e.style = NONE_TYPE;
    }
  }
  createtest = this.profile.getprofile()().purchased;
  loading = false;

  buy(id: string) {
    if (id == '1') {
      if (this.profile.getprofile()().wallet >= 200) {
        this.loading = true;

        this.http
          .get(
            `${environment.backend}/users/64d8d9b37b81e63e98ec2a15/purchase`,
            { headers: this.getHeader() }
          )
          .subscribe(
            (response) => {
              this.profile.getprofile()().wallet =
                this.profile.getprofile()().wallet - 200;
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
  start() {
    this.router.navigate(['/pages']);
  }
}
