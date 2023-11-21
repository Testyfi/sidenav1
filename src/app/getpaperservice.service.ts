import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class GetpaperserviceService {
  constructor(private router: Router) {}
  paperjson = JSON.parse('{"":""}');
  totalquestion = 0;
  right = 0;
  wrong = 0;
  unattempted = 0;
  rightorwrong: Array<boolean> = Array(4);
  answer: Array<string> = Array();
  analytics = false;
  setpaper(paper: string) {
    this.paperjson = JSON.parse(paper);
    this.totalquestion = this.paperjson.questions.length;
  }
  getquestion(index: number) {
    let temp = JSON.stringify(this.paperjson.questions[index]);

    return temp;
  }
  getquestiontype(index: number) {
    let temp = this.paperjson.questions[index].questiontype;

    return temp;
  }
  twodigitafterdecimal(s: string) {
    let num = parseFloat(s).toFixed(2);
    return num;
  }
  getanswer(index: number) {
    let temp = this.paperjson.questions[index].currectanswer;
    return this.twodigitafterdecimal(temp);
  }
  getanswerstring(index: number) {
    let temp = this.paperjson.questions[index].currectanswer;
    return temp;
  }
  setresult(
    a: number,
    b: number,
    c: number,
    rightorwrong: Array<boolean>,
    answer: Array<string>
  ) {
    this.right = a;
    this.wrong = b;
    this.unattempted = c;
    this.rightorwrong = rightorwrong;
    this.answer = answer;
  }
}
