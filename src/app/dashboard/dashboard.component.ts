import {
  Component,
  OnInit,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetpaperserviceService } from '../getpaperservice.service';
import { Router } from '@angular/router';
import { RankboostertestService } from '../rankboostertest.service';
import { question, questiondata, Tests, testtype } from './questiontype';
import { json } from 'express';
import { environment } from 'src/environments/environment';
import { CdTimerModule } from 'angular-cd-timer';
import { TimeInterface } from 'angular-cd-timer';
import { DatePipe } from '@angular/common';
import { StatisticsService } from '../statistics.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    public paperservice: GetpaperserviceService,
    private http: HttpClient,
    private rankbooster: RankboostertestService, //private datepipe: DatePipe,
    private statisticsservice: StatisticsService
  ) {}
  //private apiUrl = 'http://localhost:8080/rankbooster/pasttest';
  private apiUrl = `${environment.backend}/rankbooster/pasttest`;
  // Tests = Tests;
  Test: Array<testtype> = new Array();
  num: number = 0;
  ifupcomming = false;
  ifongoing = false;
  contestclass = 'big-container-flex';
  loading: boolean = false;
  date: Date = new Date();
  pasttest: Array<testtype> = new Array();
  ongoing: Array<testtype> = new Array();
  upcoming: Array<testtype> = new Array();
  ds: string = '';
  @Output() logout: EventEmitter<boolean> = new EventEmitter();
  onResized(event: ResizedEvent) {
    this.num = event.newRect.width;
    if (this.num <= 700) this.contestclass = 'big-container-block';
    if (this.num > 700) this.contestclass = 'big-container-flex';
    //this.height = event.newRect.height;
  }
  ngOnInit(): void {
    this.num = window.innerWidth;
    if (this.num < 700) this.contestclass = 'big-container-block';
    //this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.getalltest();
    /*
    this.Tests = this.Test;
    //console.log(this.Tests);
    this.date = new Date();
    this.pasttest = new Array();
    this.ongoing = new Array();
    this.upcoming = new Array();
    let currenttime =
      this.date.getFullYear() +
      '/' +
      (this.date.getMonth() + 1) +
      '/' +
      this.date.getDate() +
      '/' +
      this.date.getHours() +
      '/' +
      this.date.getMinutes() +
      '/' +
      this.date.getSeconds();

    for (let i = 0; i < this.Test.length; i++) {
      let starttime = this.Test[i].Start.split('/');
      let endtime = this.Test[i].Start.split('/');
      endtime[3] = parseInt(endtime[3]) + 3 + '';
      if (this.dateTimeMatch(currenttime.split('/'), endtime) == 0) {
        //console.log(s1 + '   ' + s2 + '  ' + i);
        this.pasttest.push(this.Test[i]);
        //console.log(this.Test[i]);
      }
      if (this.dateTimeMatch(currenttime.split('/'), starttime) == 2) {
        this.upcoming.push(this.Test[i]);
      }
      if (
        this.dateTimeMatch(currenttime.split('/'), starttime) == 1 ||
        (this.dateTimeMatch(currenttime.split('/'), starttime) == 0 &&
          this.dateTimeMatch(currenttime.split('/'), endtime) == 2)
      ) {
        this.ongoing.push(this.Test[i]);
        console.log(this.Test[i]);
      }
    }
    */
    //console.log();
    this.statisticsservice.statistics();
    if (this.upcoming.length > 0) {
      this.ifupcomming = true;
    }
    if (this.ongoing.length > 0) {
      this.ifongoing = true;
    }
  }
  getpasttest() {
    this.router.navigate(['/pasttests']);
  }
  getalltest() {
    this.loading = true;
    this.Test = new Array();
    const headers = this.getHeader();
    const body = {};
    this.http
      .post(`${environment.backend}/admins/testinfo`, body, {
        headers,
      })
      .subscribe(
        (data: any) => {
          for (let i = 0; i < data.data.length; i++) {
            this.Test.push(data.data[i]);
          }
          this.sorttest();
          this.loading = false;
        },
        (error) => {
          console.log(error);
          alert(
            'Your Token is expire or Login in different Device.Please logout and Relogin'
          );
          this.loading = false;
          localStorage.removeItem('token');
          this.logout.emit(true);
          this.router.navigate(['/user-login']);
        }
      );
  }
  sorttest() {
    this.date = new Date();
    this.pasttest = new Array();
    this.ongoing = new Array();
    this.upcoming = new Array();
    let currenttime =
      this.date.getFullYear() +
      '/' +
      (this.date.getMonth() + 1) +
      '/' +
      this.date.getDate() +
      '/' +
      this.date.getHours() +
      '/' +
      this.date.getMinutes() +
      '/' +
      this.date.getSeconds();

    for (let i = 0; i < this.Test.length; i++) {
      let starttime = this.Test[i].Start.split('/');
      let endtime = this.Test[i].Start.split('/');
      endtime[3] = parseInt(endtime[3]) + 3 + '';
      if (this.dateTimeMatch(currenttime.split('/'), endtime) == 0) {
        //console.log(s1 + '   ' + s2 + '  ' + i);
        this.pasttest.push(this.Test[i]);
        //console.log(this.Test[i]);
      }
      if (this.dateTimeMatch(currenttime.split('/'), starttime) == 2) {
        this.upcoming.push(this.Test[i]);
      }
      if (
        this.dateTimeMatch(currenttime.split('/'), starttime) == 1 ||
        (this.dateTimeMatch(currenttime.split('/'), starttime) == 0 &&
          this.dateTimeMatch(currenttime.split('/'), endtime) == 2)
      ) {
        this.ongoing.push(this.Test[i]);
        console.log(this.Test[i]);
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
  rankboosterpasttest(s: string, duration: string) {
    let dr = Number(duration);
    this.loading = true;
    let obj = JSON.parse('{"questions":"[]"}');
    let c: Array<question> = new Array();
    //console.log(s);
    this.rankbooster.getpasttest(s).subscribe(
      (data) => {
        //console.log('datad');
        //console.log(data.data);
        let temp: question[] = [];

        for (let i = 0; i < data.data.length; i++) {
          let currectanswer = data.data[i].correctanswer;
          //temp[i].questiontype = this.questiontype(data.data[i].type);
          if (this.questiontype(data.data[i].type) == 2)
            currectanswer = this.multiplecurrect(data.data[i].correctanswers);

          let optionastring = data.data[i].options[0].text;
          let optionaimage = data.data[i].options[0].image;
          if (optionaimage.length > 0)
            optionaimage = this.getimageurl(optionaimage);
          let optionbstring = data.data[i].options[1].text;
          let optionbimage = data.data[i].options[1].image;
          if (optionbimage.length > 0)
            optionbimage = this.getimageurl(optionbimage);
          let optioncstring = data.data[i].options[2].text;
          let optioncimage = data.data[i].options[2].image;
          if (optioncimage.length > 0)
            optioncimage = this.getimageurl(optioncimage);
          let optiondstring = data.data[i].options[3].text;
          let optiondimage = data.data[i].options[3].image;
          if (optiondimage.length > 0)
            optiondimage = this.getimageurl(optiondimage);
          //console.log('yes');
          // temp[i].questionstring = data.data[i].question;
          /*
        temp[i].questionstring = data.data[i].question;
        temp[i].questionimage = this.imagearraytostring(data.data[i].images);
        temp[i].currectanswer = data.data[i].currectanswer;
        

        temp[i].optionastring = data.data[i].options[0].text;
        temp[i].optionaimage = data.data[i].options[0].image;
        if (temp[i].optionaimage.length > 0)
          temp[i].optionaimage = this.getimageurl(temp[i].optionaimage);
        temp[i].optionbstring = data.data[i].options[1].text;
        temp[i].optionbimage = data.data[i].options[1].image;
        if (temp[i].optionbimage.length > 0)
          temp[i].optionbimage = this.getimageurl(temp[i].optionbimage);
        temp[i].optioncstring = data.data[i].options[2].text;
        temp[i].optioncimage = data.data[i].options[2].image;
        if (temp[i].optioncimage.length > 0)
          temp[i].optioncimage = this.getimageurl(temp[i].optioncimage);
        temp[i].optiondstring = data.data[i].options[3].text;
        temp[i].optiondimage = data.data[i].options[3].image;
        if (temp[i].optiondimage.length > 0)
          temp[i].optiondimage = this.getimageurl(temp[i].optiondimage);
        c[i] = temp[i];
        //console.log(questiondata);
        //obj[i] = temp;
        //obj.questions[i] = temp;
        //console.log(obj[i]);
        */
          temp.push({
            questionstring: data.data[i].question,
            questionimage: this.imagearraytostring(data.data[i].images),
            questiontype: this.questiontype(data.data[i].type),

            optionastring: optionastring,

            optionbstring: optionbstring,

            optioncstring: optioncstring,

            optiondstring: optiondstring,

            optionaimage: optionaimage,
            optionbimage: optionbimage,
            optioncimage: optioncimage,
            optiondimage: optiondimage,
            currectanswer: currectanswer,
            solutionstring: '',

            solutionimage: '',
          });
        }

        //const jsonObj = JSON.stringify(Object.assign({ questions: '' }, c));
        //console.log(jsonObj);
        obj.questions = temp;
        //console.log(obj.questions);
        //console.log(JSON.stringify(obj));

        //console.log(data.questions);
        //this.questionstring = data.questions[0].questionstring;
        let cs = JSON.stringify(obj);
        //console.log(obj.questions);
        //console.log(cs);
        this.paperservice.setpaper(cs);
        this.loading = false;
        this.paperservice.time = dr * 60;
        this.router.navigate(['/questionviewer']);
      },
      (error) => {
        this.loading = false;
        console.log(error);
        alert(error.error.message);
        this.router.navigate(['/products']);
      }
    );
  }
  incrementuser(testname: string) {
    const body = {
      testname: testname,
    };
    this.http
      .post<any>(
        `${environment.backend}/rankbooster/livetest/incrementuser`,
        body,
        {
          headers: this.getHeader(),
        }
      )
      .subscribe((data) => {
        console.log(data.data);
      });
  }
  rankboosterlivetest(s: string, time: string) {
    this.incrementuser(s);
    this.rankbooster.livetesttime = time;
    this.rankbooster.livetestname = s;
    this.router.navigate(['/livetest']);
    /*
    this.loading = true;
    let obj = JSON.parse('{"questions":"[]"}');
    let c: Array<question> = new Array();
    //console.log(s);
    this.rankbooster.livetesttime = t;
    this.rankbooster.getlivetest(s).subscribe((data) => {
      //console.log('datad');
      console.log(data.data);
      let temp: question[] = [];

      for (let i = 0; i < data.data.length; i++) {
        let currectanswer = data.data[i].correctanswer;
        //temp[i].questiontype = this.questiontype(data.data[i].type);
        if (this.questiontype(data.data[i].type) == 2)
          currectanswer = this.multiplecurrect(data.data[i].correctanswers);

        let optionastring = data.data[i].options[0].text;
        let optionaimage = data.data[i].options[0].image;
        if (optionaimage.length > 0)
          optionaimage = this.getimageurl(optionaimage);
        let optionbstring = data.data[i].options[1].text;
        let optionbimage = data.data[i].options[1].image;
        if (optionbimage.length > 0)
          optionbimage = this.getimageurl(optionbimage);
        let optioncstring = data.data[i].options[2].text;
        let optioncimage = data.data[i].options[2].image;
        if (optioncimage.length > 0)
          optioncimage = this.getimageurl(optioncimage);
        let optiondstring = data.data[i].options[3].text;
        let optiondimage = data.data[i].options[3].image;
        if (optiondimage.length > 0)
          optiondimage = this.getimageurl(optiondimage);
        //console.log('yes');
        // temp[i].questionstring = data.data[i].question;
        /*
        temp[i].questionstring = data.data[i].question;
        temp[i].questionimage = this.imagearraytostring(data.data[i].images);
        temp[i].currectanswer = data.data[i].currectanswer;
        

        temp[i].optionastring = data.data[i].options[0].text;
        temp[i].optionaimage = data.data[i].options[0].image;
        if (temp[i].optionaimage.length > 0)
          temp[i].optionaimage = this.getimageurl(temp[i].optionaimage);
        temp[i].optionbstring = data.data[i].options[1].text;
        temp[i].optionbimage = data.data[i].options[1].image;
        if (temp[i].optionbimage.length > 0)
          temp[i].optionbimage = this.getimageurl(temp[i].optionbimage);
        temp[i].optioncstring = data.data[i].options[2].text;
        temp[i].optioncimage = data.data[i].options[2].image;
        if (temp[i].optioncimage.length > 0)
          temp[i].optioncimage = this.getimageurl(temp[i].optioncimage);
        temp[i].optiondstring = data.data[i].options[3].text;
        temp[i].optiondimage = data.data[i].options[3].image;
        if (temp[i].optiondimage.length > 0)
          temp[i].optiondimage = this.getimageurl(temp[i].optiondimage);
        c[i] = temp[i];
        //console.log(questiondata);
        //obj[i] = temp;
        //obj.questions[i] = temp;
        //console.log(obj[i]);
        */
    /*
        temp.push({
          questionstring: data.data[i].question,
          questionimage: this.imagearraytostring(data.data[i].images),
          questiontype: this.questiontype(data.data[i].type),

          optionastring: optionastring,

          optionbstring: optionbstring,

          optioncstring: optioncstring,

          optiondstring: optiondstring,

          optionaimage: optionaimage,
          optionbimage: optionbimage,
          optioncimage: optioncimage,
          optiondimage: optiondimage,
          currectanswer: currectanswer,
          solutionstring: '',

          solutionimage: '',
        });
      }

      //const jsonObj = JSON.stringify(Object.assign({ questions: '' }, c));
      //console.log(jsonObj);
      obj.questions = temp;
      //console.log(obj.questions);
      //console.log(JSON.stringify(obj));

      //console.log(data.questions);
      //this.questionstring = data.questions[0].questionstring;
      let cs = JSON.stringify(obj);
      //console.log(obj.questions);
      //console.log(cs);
      this.paperservice.setpaper(cs);
      this.loading = false;
    
      this.router.navigate(['/livetest']);
    });
    */
  }
  imagearraytostring(array: string[]) {
    if (array.length == 0) return '';
    return this.getimageurl(array[0]);
  }
  multiplecurrect(s: string[]) {
    let s1 = s[0];

    for (let i = 1; i < s.length; i++) {
      s1 = s1 + ',' + s[i];
    }
    return s1;
  }
  questiontype(s: string) {
    if (s[0] === 'S') return 1;
    if (s[0] === 'M') return 2;
    if (s[0] === 'N') return 3;
    return 4;
  }
  getimageurl(s: string) {
    let s1: string = '';
    for (let i = 0; i < s.length - 5; i++) {
      s1 = s1 + s[i];
    }
    let url =
      'https://testify-jee.s3.ap-south-1.amazonaws.com/assets/questions/' +
      s1 +
      '/' +
      s;
    return url;
  }
  dateTimeMatch(a: string[], b: string[]) {
    for (let i = 0; i < a.length; i++) {
      if (parseInt(a[i]) > parseInt(b[i])) return 0;
      if (parseInt(a[i]) < parseInt(b[i])) return 2;
    }
    return 1;
  }
  ontick() {
    //console.log('tick');
    this.date = new Date();
    this.pasttest = new Array();
    this.ongoing = new Array();
    this.upcoming = new Array();
    let currenttime =
      this.date.getFullYear() +
      '/' +
      (this.date.getMonth() + 1) +
      '/' +
      this.date.getDate() +
      '/' +
      this.date.getHours() +
      '/' +
      this.date.getMinutes() +
      '/' +
      this.date.getSeconds();

    for (let i = 0; i < this.Test.length; i++) {
      let starttime = this.Test[i].Start.split('/');
      let endtime = this.Test[i].Start.split('/');
      endtime[3] = parseInt(endtime[3]) + 3 + '';
      if (this.dateTimeMatch(currenttime.split('/'), endtime) == 0) {
        //console.log(s1 + '   ' + s2 + '  ' + i);
        this.pasttest.push(this.Test[i]);
      }
      if (this.dateTimeMatch(currenttime.split('/'), starttime) == 2) {
        this.upcoming.push(this.Test[i]);
      }
      if (
        this.dateTimeMatch(currenttime.split('/'), starttime) == 1 ||
        (this.dateTimeMatch(currenttime.split('/'), starttime) == 0 &&
          this.dateTimeMatch(currenttime.split('/'), endtime) == 2)
      ) {
        this.ongoing.push(this.Test[i]);
      }
    }
  }
}
