import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { QP, question } from './qpaper';
import { GetpaperserviceService } from '../getpaperservice.service';
@Component({
  selector: 'app-allcreatedtest',
  templateUrl: './allcreatedtest.component.html',
  styleUrls: ['./allcreatedtest.component.scss'],
})
export class AllcreatedtestComponent implements OnInit {
  qp: QP[] = [];
  loading = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    public paperservice: GetpaperserviceService
  ) {}
  ngOnInit(): void {
    this.loading = true;
    const headers = this.getHeader();
    const data4 = {
      difficulty: 'Jee Advanced',
    };
    this.http
      .post(`${environment.backend}/test/findallcreatedtest`, data4, {
        headers,
      })
      .subscribe((data: any) => {
        console.log(data.data);
        for (let i = 0; i < data.data.length; i++) {
          let x: QP = {
            Name: '',
            Duration: '',
            Difficulty: '',
            Qid: '',
            Qs: [],
          };

          x.Difficulty = data.data[i].Difficulty;
          x.Name = data.data[i].name;
          x.Duration = data.data[i].Duration;
          x.Qid = data.data[i].qpid;
          x.Qs = data.data[i].questions;
          this.qp.push(x);
        }
        this.loading = false;
      });
  }
  returnminutes(str: string): number {
    if (str[0] == '2') return 20;

    if (str[0] == '6') return 60;
    return 180;
  }
  getquestionpaper(question: string[], duration: string) {
    let dr = this.returnminutes(duration);
    this.loading = true;
    let obj = JSON.parse('{"questions":"[]"}');
    let c: Array<question> = new Array();

    const headers = this.getHeader();
    const data4 = {
      questions: question,
    };
    this.http
      .post(`${environment.backend}/test/findcreatedtestquestions`, data4, {
        headers,
      })
      .subscribe((data: any) => {
        console.log(data);
        //console.log('datad');
        //console.log(data.data);
        let temp: question[] = [];

        for (let i = 0; i < data.data.length; i++) {
          let currectanswer = data.data[i].correctAnswer;
          //console.log(currectanswer);
          //temp[i].questiontype = this.questiontype(data.data[i].type);
          if (this.questiontype(data.data[i].questionType) == 2)
            currectanswer = this.multiplecurrect(data.data[i].correctAnswers);

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
            questionstring: data.data[i].questionText,
            questionimage: this.imagearraytostring(data.data[i].images),
            questiontype: this.questiontype(data.data[i].questionType),

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
      });
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

  getHeader() {
    let str: any = '';
    str = localStorage.getItem('token');

    let response = JSON.parse(str);
    const token: string = response.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }
}
