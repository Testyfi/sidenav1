import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { Router } from '@angular/router';
import { CdTimerComponent, CdTimerModule } from 'angular-cd-timer';
import { MathjaxModule } from 'mathjax-angular';
import { GetpaperserviceService } from '../getpaperservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RankboostertestService } from '../rankboostertest.service';
import { question, questiondata } from '../dashboard/questiontype';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-livetest',
  templateUrl: './livetest.component.html',
  styleUrls: ['./livetest.component.scss'],
})
export class LivetestComponent implements AfterViewInit {
  constructor(
    private router: Router,
    public paperservice: GetpaperserviceService,
    private http: HttpClient,
    private rnkbo: RankboostertestService
  ) {}
  @ViewChild('basicTimer') cdtimer: CdTimerComponent | undefined;
  totaluser = 1;
  rank = 1;
  maxquestion = 54;
  timeinseconds = (3 * 60 * 60) / this.maxquestion;
  onequestiontime = (3 * 60 * 60) / this.maxquestion;
  private apiUrl = 'http://localhost:8080';
  loading: boolean = true;
  num: number = 0;
  coll: boolean = false;
  list: boolean = true;
  single: boolean = false;
  multiple: boolean = false;
  numerical: boolean = false;
  questionstring: string = '';
  questionimage: boolean = false;
  questionimageurl: string = '';
  optionaimage: boolean = false;
  optionaimageurl: string = '';
  optionastring: string = '';
  optiona: boolean = false;
  optionbimage: boolean = false;
  optionbimageurl: string = '';
  optionbstring: string = '';
  optionb: boolean = false;
  optioncimage: boolean = false;
  optioncimageurl: string = '';
  optioncstring: string = '';
  optionc: boolean = false;
  optiondimage: boolean = false;
  optiondimageurl: string = '';
  optiondstring: string = '';
  optiond: boolean = false;
  index = 0;
  maxindex = this.paperservice.totalquestion - 1;
  selectarry: Array<number> = Array(this.maxindex + 1);
  selectedquestion = 0;

  sngans = '';
  numericanswer = '';
  multanswer: Array<string> = Array(4);
  answer: Array<string> = Array(this.maxindex + 1);
  right = 0;
  wrong = 0;
  unattempted = this.maxindex + 1;
  rightorwrong: Array<boolean> = Array(this.maxindex + 1);
  onResized(event: ResizedEvent) {
    this.num = event.newRect.width;
    //this.height = event.newRect.height;

    if (this.num < 900) {
      let e: any = document.getElementById('restBody');
      e.style.display = 'block';
      //console.log("yes");
    } else {
      let e: any = document.getElementById('restBody');
      e.style.display = 'flex';
    }
  }
  ngOnInit(): void {
    this.totalstudents(this.rnkbo.livetestname);
    this.getrank(this.rnkbo.livetestname);

    //this.timeinseconds = 200;
    this.num = window.innerWidth;

    if (this.num < 900) {
      if (this.single || this.multiple) {
        let e: any = document.getElementById('restBody');
        e.style.display = 'block';
      }
      //console.log("yes");
    } else {
      if (this.single || this.multiple) {
        let e: any = document.getElementById('restBody');
        e.style.display = 'flex';
      }
    }
    //this.findquestionindex();
    /*
    this.findquestionindex();
    let question = JSON.parse(this.paperservice.getquestion(this.index));
    if (question.questiontype == 1) this.Single(question);
    if (question.questiontype == 2) this.Multiple(question);
    if (question.questiontype == 3) this.Numerical(question);
    */
    // console.log(this.getquestionfrombackend());
    // this.loading = true;
    // this.getquestionfrombackend();
    this.findquestionindex();
    this.loading = true;
    this.getquestionfrombackend();
  }
  ontimeend() {
    this.findquestionindex();
    this.loading = true;
    this.getquestionfrombackend();
    this.resetTimer();
  }
  imagearraytostring(array: string[]) {
    if (array.length == 0) return '';
    return this.getimageurl(array[0]);
  }
  getquestionfrombackend() {
    // this.loading = true;

    this.rnkbo.getlivetest(this.rnkbo.livetestname).subscribe((data) => {
      this.loading = false;
      console.log(data.data);
      let temp: question = questiondata;
      temp.questionstring = data.data.question;
      temp.questionimage = this.imagearraytostring(data.data.images);
      temp.currectanswer = data.data.currectanswer;
      temp.questiontype = this.questiontype(data.data.type);
      temp.optionastring = data.data.options[0].text;
      temp.optionaimage = data.data.options[0].image;
      if (temp.optionaimage.length > 0)
        temp.optionaimage = this.getimageurl(temp.optionaimage);
      temp.optionbstring = data.data.options[1].text;
      temp.optionbimage = data.data.options[1].image;
      if (temp.optionbimage.length > 0)
        temp.optionbimage = this.getimageurl(temp.optionbimage);
      temp.optioncstring = data.data.options[2].text;
      temp.optioncimage = data.data.options[2].image;
      if (temp.optioncimage.length > 0)
        temp.optioncimage = this.getimageurl(temp.optioncimage);
      temp.optiondstring = data.data.options[3].text;
      temp.optiondimage = data.data.options[3].image;
      if (temp.optiondimage.length > 0)
        temp.optiondimage = this.getimageurl(temp.optiondimage);
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
      if (temp.questiontype == 1) this.Single(temp);
      if (temp.questiontype == 2) this.Multiple(temp);
      if (temp.questiontype == 3) this.Numerical(temp);
    });
    //

    this.rnkbo
      .putlivetestresponse(this.rnkbo.livetestname, this.returnanswer())
      .subscribe((data) => {
        console.log(data.data);
      });
  }
  returnanswer(): string {
    if (this.single) return this.sngans;
    if (this.numerical) return this.numericanswer;
    if (this.multiple) return this.arraytostring(this.multanswer.sort());
    return '';
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
  findquestionindex() {
    var starttime = this.rnkbo.livetesttime.split('/');
    //console.log(starttime);
    var secondsgone = 0;

    var date = new Date();

    secondsgone = date.getSeconds() - parseInt(starttime[5]);
    //console.log(secondsgone);
    secondsgone =
      date.getMinutes() * 60 - parseInt(starttime[4]) * 60 + secondsgone;
    secondsgone =
      date.getHours() * 60 * 60 -
      parseInt(starttime[3]) * 60 * 60 +
      secondsgone;
    this.index = parseInt(secondsgone / this.onequestiontime + '');
    this.timeinseconds =
      this.onequestiontime - (secondsgone % this.onequestiontime);
    //console.log(this.index + '  ' + this.timeinseconds + '  ' + secondsgone);
  }
  checktime() {
    var starttime = this.rnkbo.livetesttime.split('/');
    //console.log(starttime);
    var secondsgone = 0;

    var date = new Date();
    //console.log(date);
    secondsgone = date.getSeconds() - parseInt(starttime[5]);
    //console.log(secondsgone);
    secondsgone =
      date.getMinutes() * 60 - parseInt(starttime[4]) * 60 + secondsgone;
    //console.log(secondsgone);
    secondsgone =
      date.getHours() * 60 * 60 -
      parseInt(starttime[3]) * 60 * 60 +
      secondsgone;
    //console.log(secondsgone);
    console.log(parseInt(secondsgone / this.onequestiontime + ''));

    console.log(this.onequestiontime - (secondsgone % this.onequestiontime));
  }
  tick() {
    //console.log(this.checktime());
    // this.checktime();
  }
  getrank(testname: string) {
    const body = {
      testname: testname,
    };
    this.http
      .post<any>(`${environment.backend}/rankbooster/livetest/rank`, body, {
        headers: this.getHeader(),
      })
      .subscribe((data) => {
        this.rank = data.data;
      });
    //console.log(htrs);
  }
  totalstudents(testname: string) {
    const body = {
      testname: testname,
    };
    this.http
      .post<any>(
        `${environment.backend}/rankbooster/livetest/totaluser`,
        body,
        {
          headers: this.getHeader(),
        }
      )
      .subscribe((data) => {
        this.totaluser = data.data;
      });
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
  Single(question: any) {
    this.single = true;
    this.multiple = false;
    this.list = false;
    this.numerical = false;
    this.questionstring = question.questionstring;
    this.questionimage = this.imagecheck(question.questionimage);
    this.questionimageurl = question.questionimage;
    this.optionaimage = this.imagecheck(question.optionaimage);
    this.optionaimageurl = question.optionaimage;
    this.optionastring = question.optionastring;
    this.optiona = this.imagecheck(question.optionastring);
    this.optionbimage = this.imagecheck(question.optionbimage);
    this.optionbimageurl = question.optionbimage;
    this.optionbstring = question.optionbstring;
    this.optionb = this.imagecheck(question.optionbstring);
    this.optioncimage = this.imagecheck(question.optioncimage);
    this.optioncimageurl = question.optioncimage;
    this.optioncstring = question.optioncstring;
    this.optionc = this.imagecheck(question.optioncstring);
    this.optiondimage = this.imagecheck(question.optiondimage);
    this.optiondimageurl = question.optiondimage;
    this.optiondstring = question.optiondstring;
    this.optiond = this.imagecheck(question.optiondstring);
    // this.answer[this.index] = this.sngans;
    // console.log(this.sngans);
    //  this.sngans = '';
  }
  Multiple(question: any) {
    this.single = false;
    this.multiple = true;
    this.list = false;
    this.numerical = false;
    this.questionstring = question.questionstring;
    this.questionimage = this.imagecheck(question.questionimage);
    this.questionimageurl = question.questionimage;
    this.optionaimage = this.imagecheck(question.optionaimage);
    this.optionaimageurl = question.optionaimage;
    this.optionastring = question.optionastring;
    this.optiona = this.imagecheck(question.optionastring);
    this.optionbimage = this.imagecheck(question.optionbimage);
    this.optionbimageurl = question.optionbimage;
    this.optionbstring = question.optionbstring;
    this.optionb = this.imagecheck(question.optionbstring);
    this.optioncimage = this.imagecheck(question.optioncimage);
    this.optioncimageurl = question.optioncimage;
    this.optioncstring = question.optioncstring;
    this.optionc = this.imagecheck(question.optioncstring);
    this.optiondimage = this.imagecheck(question.optiondimage);
    this.optiondimageurl = question.optiondimage;
    this.optiondstring = question.optiondstring;
    this.optiond = this.imagecheck(question.optiondstring);
    // this.answer[this.index] = this.arraytostring(this.multanswer);
    // console.log(this.multanswer);
    //  this.multanswer = Array(4);
  }
  Numerical(question: any) {
    this.single = false;
    this.multiple = false;
    this.list = false;
    this.numerical = true;
    this.questionstring = question.questionstring;
    this.questionimage = this.imagecheck(question.questionimage);
    this.questionimageurl = question.questionimage;
    // this.answer[this.index] = this.numericanswer;
    //console.log(this.numericanswer);
    // this.numericanswer = '';
  }
  imagecheck(str: string) {
    if (str.length > 0) return true;
    return false;
  }

  getquestion(index: number) {
    let question = JSON.parse(this.paperservice.getquestion(this.index));
    if (question.questiontype == 1) {
      this.savesingle(this.sngans);
      this.sngans = '';
      // this.sngans = this.answer[index];
    }
    if (question.questiontype == 2) {
      this.savemult(this.arraytostring(this.multanswer));
      this.multanswer = Array(4);
      // this.multanswer = this.strtoarray(this.answer[index]);
    }
    if (question.questiontype == 3) {
      this.savenumber(this.numericanswer);
      this.numericanswer = '';
      //this.numericanswer = this.answer[index];
    }
    //console.log(this.sngans);
    //console.log(this.multanswer);
    this.index = index;
    // this.checktime();
    //this.findquestionindex();
    this.resetTimer();
    question = JSON.parse(this.paperservice.getquestion(index));
    if (question.questiontype == 1) {
      this.sngans = this.answer[index];
      this.Single(question);
      // this.sngans = this.answer[index];
    }
    if (question.questiontype == 2) {
      this.multanswer = this.strtoarray(this.answer[index]);
      this.Multiple(question);

      // this.multanswer = this.strtoarray(this.answer[index]);
    }
    if (question.questiontype == 3) {
      this.numericanswer = this.answer[index];
      this.Numerical(question);
      //this.numericanswer = this.answer[index];
    }
  }

  someSelection() {
    this.getquestion(this.selectedquestion - 1);
  }
  submit() {
    let question = JSON.parse(this.paperservice.getquestion(this.index));
    if (question.questiontype == 1) {
      this.savesingle(this.sngans);
      this.sngans = '';
      // this.sngans = this.answer[index];
    }
    if (question.questiontype == 2) {
      this.savemult(this.arraytostring(this.multanswer));
      this.multanswer = Array(4);
      // this.multanswer = this.strtoarray(this.answer[index]);
    }
    if (question.questiontype == 3) {
      this.savenumber(this.numericanswer);
      this.numericanswer = '';
      //this.numericanswer = this.answer[index];
    }

    for (let i = 0; i < this.answer.length; i++) {
      if (this.paperservice.getquestiontype(i) == 3) {
        if (
          this.twodigitafterdecimal(this.answer[i]) ==
          this.paperservice.getanswer(i)
        ) {
          console.log(this.twodigitafterdecimal(this.answer[i]));
          console.log(this.paperservice.getanswer(i));
          this.right++;
          this.unattempted--;
          this.rightorwrong[i] = true;
        } else {
          if (this.answer[i] != undefined && this.answer[i].length > 0) {
            this.wrong++;
            this.unattempted--;
            this.rightorwrong[i] = false;
          }
        }
      } else {
        if (this.answer[i] === this.paperservice.getanswerstring(i)) {
          this.right++;
          this.unattempted--;
          this.rightorwrong[i] = true;
        } else {
          if (this.answer[i] != undefined && this.answer[i].length > 0) {
            //console.log(this.answer[i]);
            this.wrong++;
            this.unattempted--;
            this.rightorwrong[i] = false;
          }
        }
      }
    }
    this.paperservice.setresult(
      this.right,
      this.wrong,
      this.unattempted,
      this.rightorwrong,
      this.answer
    );
    this.router.navigate(['/result']);
  }
  twodigitafterdecimal(s: string) {
    let num = parseFloat(s).toFixed(2);
    return num;
  }
  numericalAnswer(e: any) {
    this.sngans = e.target.value;
    console.log(this.sngans);
  }
  arraytostring(a: Array<string>): string {
    let s = '';
    if (a[0] != undefined) s = a[0];
    for (let i = 1; i < a.length; i++) {
      if (a[i] != undefined) s = s + ',' + a[i];
    }
    return s;
  }
  strtoarray(s: string): Array<string> {
    if (s == undefined) {
      return Array(4);
    }
    return s.split(',');
  }
  savesingle(s: string) {
    this.answer[this.index] = s;
  }
  savemult(s: string) {
    console.log(s);
    this.answer[this.index] = s;
  }
  savenumber(s: string) {
    this.answer[this.index] = s;
  }
  ngAfterViewInit() {
    // You can access the cdTimer instance after the view is initialized
    if (this.cdtimer) {
      // Do something with the cdTimer
    }
  }
  resetTimer() {
    if (this.cdtimer) {
      // Call a reset method on your cdTimer component
      this.cdtimer.reset();
      //this.cdtimer.autoStart = false;
      //this.cdtimer.startTime = (3 * 60 * 60) / this.maxquestion;
      this.cdtimer.startTime = this.timeinseconds;
      this.cdtimer.start();
    }
  }
}
