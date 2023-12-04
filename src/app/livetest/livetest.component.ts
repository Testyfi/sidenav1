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

  timeinseconds = (3 * 60 * 60) / this.paperservice.totalquestion;
  private apiUrl = 'http://localhost:8080';
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
    // this.timeinseconds = 200;
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
    this.findquestionindex();
    let question = JSON.parse(this.paperservice.getquestion(this.index));
    if (question.questiontype == 1) this.Single(question);
    if (question.questiontype == 2) this.Multiple(question);
    if (question.questiontype == 3) this.Numerical(question);
  }
  findquestionindex() {
    var starttime = this.rnkbo.livetesttime.split('/');
    var secondsgone = 0;
    var mul = 1;
    var date = new Date();

    secondsgone = date.getSeconds() - parseInt(starttime[5]);
    secondsgone =
      date.getMinutes() * 60 - parseInt(starttime[4]) * 60 + secondsgone;
    secondsgone =
      date.getHours() * 60 * 60 -
      parseInt(starttime[3]) * 60 * 60 +
      secondsgone;
    this.index = parseInt(secondsgone / this.timeinseconds + '');
    this.timeinseconds =
      this.timeinseconds - (secondsgone % this.timeinseconds);
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
      this.cdtimer.startTime = (3 * 60 * 60) / this.paperservice.totalquestion;
      this.cdtimer.start();
    }
  }
}
