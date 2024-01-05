import { Component, OnInit, HostListener, Injectable } from '@angular/core';
import { question, questiondata, Tests, testtype } from './questiontype';
import { Physics, MatheMatics, Chemistry } from './Topic';
import { AngularResizeEventModule } from 'angular-resize-event';
import { ResizedEvent } from 'angular-resize-event';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee } from './employee';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { difficulty } from './Difficulty';
import { time } from './Difficulty';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProfilepictureupdateService } from '../profilepictureupdate.service';
import { GetpaperserviceService } from '../getpaperservice.service';
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
  time = time;
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
  timme: string = '';
  warndiff: boolean = false;
  physicstopics: Array<string> = new Array<string>();
  chemistrytopics: Array<string> = new Array<string>();
  mathtopics: Array<string> = new Array<string>();
  em = [this.pyCheck, this.chCheck, this.meCheck];

  constructor(
    private http: HttpClient,
    private router: Router,
    public profile: ProfilepictureupdateService,
    public paperservice: GetpaperserviceService
  ) {}
  mappytopic = new Map<string, number>();
  mapchtopic = new Map([]);
  mapmttopic = new Map([]);
  loading = false;

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
  } /*
  createyourtest() {
    this.loading = true;
    const data = {
      topics: ['Kinematics', 'Physics'],
      number: 6,
    };
    const headers = this.getHeader();

    this.http
      .post(`${environment.backend}/test/createyourtest`, data, {
        headers,
      })
      .subscribe(
        (response: any) => {
          console.log(response.data);

          this.loading = false;
        },
        (error) => {
          console.log(error);
          alert(error.error);
          this.loading = false;
        }
      );
  }*/
  createyourtest() {
    this.loading = true;
    const data = {
      topics: this.physicstopics,
      number: this.timme,
    };
    const headers = this.getHeader();
    let obj = JSON.parse('{"questions":"[]"}');
    let c: Array<question> = new Array();
    let phy: question[] = [];
    let mat: question[] = [];
    let che: question[] = [];
    //console.log(s);
    this.http
      .post(`${environment.backend}/test/createyourtest`, data, {
        headers,
      })
      .subscribe((data: any) => {
        //console.log('datad');
        console.log(data.data);
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

        //console.log(obj.questions);
        //console.log(JSON.stringify(obj));

        //console.log(data.questions);
        //this.questionstring = data.questions[0].questionstring;

        //console.log(obj.questions);
        //console.log(cs);
        phy = temp;
        const data2 = {
          topics: this.chemistrytopics,
          number: this.timme,
        };

        this.http
          .post(`${environment.backend}/test/createyourtest`, data2, {
            headers,
          })
          .subscribe((data: any) => {
            //console.log('datad');
            console.log(data.data);
            let temp: question[] = [];

            for (let i = 0; i < data.data.length; i++) {
              let currectanswer = data.data[i].correctAnswer;
              //console.log(currectanswer);
              //temp[i].questiontype = this.questiontype(data.data[i].type);
              if (this.questiontype(data.data[i].questionType) == 2)
                currectanswer = this.multiplecurrect(
                  data.data[i].correctAnswers
                );

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

            //console.log(obj.questions);
            //console.log(JSON.stringify(obj));

            //console.log(data.questions);
            //this.questionstring = data.questions[0].questionstring;

            //console.log(obj.questions);
            //console.log(cs);
            che = temp;
            const data3 = {
              topics: this.mathtopics,
              number: this.timme,
            };

            this.http
              .post(`${environment.backend}/test/createyourtest`, data3, {
                headers,
              })
              .subscribe((data: any) => {
                //console.log('datad');
                console.log(data.data);
                let temp: question[] = [];

                for (let i = 0; i < data.data.length; i++) {
                  let currectanswer = data.data[i].correctAnswer;
                  //console.log(currectanswer);
                  //temp[i].questiontype = this.questiontype(data.data[i].type);
                  if (this.questiontype(data.data[i].questionType) == 2)
                    currectanswer = this.multiplecurrect(
                      data.data[i].correctAnswers
                    );

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

                //console.log(obj.questions);
                //console.log(JSON.stringify(obj));

                //console.log(data.questions);
                //this.questionstring = data.questions[0].questionstring;

                //console.log(obj.questions);
                //console.log(cs);
                mat = temp;
                temp = mat.concat(che);
                temp = temp.concat(phy);
                obj.questions = temp;
                let cs = JSON.stringify(obj);
                this.paperservice.setpaper(cs);
                this.loading = false;

                this.router.navigate(['/questionviewer']);
              });
          });
      });
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
      this.mappytopic.set(this.Physics[i].name, this.Physics[i].idNo);
      this.pyCheck[i] = false;
    }
    for (let i = 0; i < Chemistry.length; i++) {
      this.mapchtopic.set(this.Chemistry[i].name, this.Chemistry[i].idNo);
      this.chCheck[i] = false;
    }
    for (let i = 0; i < MatheMatics.length; i++) {
      this.mapmttopic.set(this.MatheMatics[i].name, this.MatheMatics[i].idNo);
      this.meCheck[i] = false;
    }
    this.num = window.innerWidth;
    if (this.num < 500) {
      this.coll = true;
      //console.log(this.num);
    }
    // this.createyourtest();
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
      //this.beforetest = false;
      //this.aftertest = true;
      //this.loading = true;

      for (let i = 0; i < Physics.length; i++) {
        if (this.pyCheck[i]) {
          this.physicstopics = this.physicstopics.concat(Physics[i].topic);
        }
      }

      for (let i = 0; i < Chemistry.length; i++) {
        if (this.chCheck[i]) {
          this.chemistrytopics = this.chemistrytopics.concat(
            Chemistry[i].topic
          );
        }
      }
      for (let i = 0; i < MatheMatics.length; i++) {
        if (this.meCheck[i]) {
          this.mathtopics = this.mathtopics.concat(MatheMatics[i].topic);
        }
      }

      //console.log(physicstopics);
      //console.log(mathtopics);
      //console.log(chemistrytopics);
      this.createyourtest();
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
  randomarray(s: string[]) {
    let a: number[] = [];
    let map1 = new Map([]);
    for (let b = 0; b < s.length; b++) {
      a[b] = this.randomint();
      map1.set(a[b], s[b]);
    }
    map1 = new Map([...map1.entries()].sort());

    // Separately printing only keys
    let index = 0;
    for (let [key, value] of map1) {
      s[index] = '' + value;
      index += 1;
    }
    return s;
  }
  randomint() {
    return Math.random() * 100;
  }
}
