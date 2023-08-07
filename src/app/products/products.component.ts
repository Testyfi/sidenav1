import { Component, OnInit } from '@angular/core';
import { courses } from './courses';
import { ResizedEvent } from 'angular-resize-event';
import { combo } from './combo';
import { NONE_TYPE } from '@angular/compiler';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
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
}
