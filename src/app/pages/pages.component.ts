import { Component, OnInit, HostListener, Injectable } from '@angular/core';

import { Physics, MatheMatics, Chemistry } from './Topic';
import { AngularResizeEventModule } from 'angular-resize-event';
import { ResizedEvent } from 'angular-resize-event';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee } from './employee';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { difficulty } from './Difficulty';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  Physics = Physics;
  MatheMatics = MatheMatics;
  Chemistry = Chemistry;
  difficulty = difficulty;
  container: string = 'container1';
  coll: boolean = false;
  num: number = 0;
  pyCheck: boolean[] = new Array(Physics.length);
  chCheck: boolean[] = new Array(Chemistry.length);
  meCheck: boolean[] = new Array(MatheMatics.length);
  pySt: boolean = false;
  chSt: boolean = false;
  meSt: boolean = false;
  //warn:boolean=false;
  warnph: boolean = false;
  warnch: boolean = false;
  warnme: boolean = false;
  beforetest: boolean = true;
  aftertest: boolean = false;
  ob: Observable<IEmployee[]> = new Observable<IEmployee[]>();
  data: IEmployee[] = [];
  url: string = 'http://192.168.1.44:8000/data';
  diff: string = '';
  warndiff: boolean = false;
  em = [this.pyCheck, this.chCheck, this.meCheck];
  constructor(private http: HttpClient) {}

  getEmployees(): void {
    try {
      //this.ob= this.http.get<IEmployee[]>(this.url);
      //console.log(this.ob);
      //this.ob.subscribe(data=>this.data=data);

      this.http.post<IEmployee[]>(this.url, this.em).subscribe((data) => {
        this.data = data;
      });
    } catch (e) {
      console.log('this is the catch');
    }
  }

  /*
 @HostListener('window:resize',['$event'])
  onResize(event:any)
  {
    this.num=event.target.innerWidth;
    if(this.num<700)
    {
      console.log(this.num);
      this.coll=true;
    
    }
    else if(this.coll)
  {

    this.coll=false;
  }
 
  }
 */
  //width: number;
  //height: number;

  onResized(event: ResizedEvent) {
    this.num = event.newRect.width;
    //this.height = event.newRect.height;

    // console.log(this.num);
    if (this.num < 500) {
      //console.log(this.num);
      this.coll = true;
    } else if (this.coll) {
      this.coll = false;
    }
    if (this.num < 900 && this.aftertest) {
      let e: any = document.getElementById('restBody');
      e.style.display = 'block';
      //console.log("yes");
    } else {
      if (this.aftertest) {
        let e: any = document.getElementById('restBody');
        e.style.display = 'flex';
      }
    }
  }
  el: any;
  //a:boolean=false;
  ngOnInit(): void {
    for (let i = 0; i < Physics.length; i++) {
      this.pyCheck[i] = false;
    }
    for (let i = 0; i < Chemistry.length; i++) {
      this.chCheck[i] = false;
    }
    for (let i = 0; i < MatheMatics.length; i++) {
      this.meCheck[i] = false;
    }
    this.num = window.innerWidth;
    if (this.num < 500) {
      this.coll = true;
      //console.log(this.num);
    }
  }

  forAll(str: string): void {
    if (str == 'Physics') {
      if (this.pySt) {
        for (let i = 0; i < Physics.length; i++) {
          this.pyCheck[i] = false;
        }
        this.pySt = false;
      } else {
        for (let i = 0; i < Physics.length; i++) {
          this.pyCheck[i] = true;
        }
        this.pySt = true;
      }
    }
    if (str == 'Chemistry') {
      if (this.chSt) {
        for (let i = 0; i < Chemistry.length; i++) {
          this.chCheck[i] = false;
        }
        this.chSt = false;
      } else {
        for (let i = 0; i < Chemistry.length; i++) {
          this.chCheck[i] = true;
        }
        this.chSt = true;
      }
    }
    if (str == 'MatheMatics') {
      if (this.meSt) {
        for (let i = 0; i < MatheMatics.length; i++) {
          this.meCheck[i] = false;
        }
        this.meSt = false;
      } else {
        for (let i = 0; i < MatheMatics.length; i++) {
          this.meCheck[i] = true;
        }
        this.meSt = true;
      }
    }
  }
  forOne(a: number, str: string) {
    if (str == 'Physics') {
      if (this.pyCheck[a]) {
        this.pyCheck[a] = false;
      } else {
        this.pyCheck[a] = true;
      }
      let start = true;
      for (let i = 0; i < Physics.length; i++) {
        //console.log(this.pyCheck[i]);
        if (this.pyCheck[i]) {
        } else {
          start = false;
          //console.log(i+"h");
          break;
        }
      }
      if (start) {
        this.pySt = true;
      } else if (this.pySt) {
        this.pySt = false;
      }
    }

    if (str == 'Chemistry') {
      if (this.chCheck[a]) {
        this.chCheck[a] = false;
      } else {
        this.chCheck[a] = true;
      }
      let start = true;
      for (let i = 0; i < 17; i++) {
        //console.log(this.pyCheck[i]);
        if (this.chCheck[i]) {
        } else {
          start = false;
          //console.log(i+"h");
          break;
        }
      }
      if (start) {
        this.chSt = true;
      } else if (this.chSt) {
        this.chSt = false;
      }
    }
    if (str == 'MatheMatics') {
      if (this.meCheck[a]) {
        this.meCheck[a] = false;
      } else {
        this.meCheck[a] = true;
      }
      let start = true;
      for (let i = 0; i < 17; i++) {
        //console.log(this.pyCheck[i]);
        if (this.meCheck[i]) {
        } else {
          start = false;
          //console.log(i+"h");
          break;
        }
      }
      if (start) {
        this.meSt = true;
      } else if (this.meSt) {
        this.meSt = false;
      }
    }
  }
  createTest() {
    let start: boolean = true;
    for (let i = 0; i < Physics.length; i++) {
      if (!this.pyCheck[i]) {
      } else {
        start = false;
        break;
      }
    }
    this.warnph = start;
    start = true;
    for (let i = 0; i < Chemistry.length; i++) {
      if (!this.chCheck[i]) {
      } else {
        start = false;
        break;
      }
    }
    this.warnch = start;
    start = true;
    for (let i = 0; i < MatheMatics.length; i++) {
      if (!this.meCheck[i]) {
      } else {
        start = false;
        break;
      }
    }
    this.warnme = start;
    if (this.diff == '') this.warndiff = true;
    else this.warndiff = false;
    if (!this.warnch && !this.warnme && !this.warnph && !this.warndiff) {
      //this.getEmployees();
      this.beforetest = false;
      this.aftertest = true;
    }
  }
}
