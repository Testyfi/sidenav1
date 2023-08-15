import { Component, OnInit } from '@angular/core';
import { courses } from './courses';
import { ResizedEvent } from 'angular-resize-event';
import { combo } from './combo';
import { NONE_TYPE } from '@angular/compiler';
import { ProfilepictureupdateService } from '../profilepictureupdate.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
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
  createtest = false;
  buy(id: string) {
    if (id == '1') {
      if (this.profile.getprofile()().wallet > 200) {
        this.profile.getprofile()().wallet =
          this.profile.getprofile()().wallet - 200;
        this.createtest = true;
      } else {
        alert(
          'your Account balance is low please add atleast ' +
            (200 - this.profile.getprofile()().wallet) +
            ' in your wallet'
        );
      }
    }
  }
  start() {
    this.router.navigate(['/pages']);
  }
}
