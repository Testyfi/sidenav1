import { Component, OnInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetpaperserviceService } from '../getpaperservice.service';
import { Router } from '@angular/router';
import { RankboostertestService } from '../rankboostertest.service';
import { question, questiondata } from './questiontype';
import { json } from 'express';
import { environment } from 'src/environments/environment';
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
    private rankbooster: RankboostertestService
  ) {}
  //private apiUrl = 'http://localhost:8080/rankbooster/pasttest';
  private apiUrl = `${environment.backend}/rankbooster/pasttest`;
  num: number = 0;
  contestclass = 'big-container-flex';
  loading: boolean = false;
  onResized(event: ResizedEvent) {
    this.num = event.newRect.width;
    if (this.num <= 700) this.contestclass = 'big-container-block';
    if (this.num > 700) this.contestclass = 'big-container-flex';
    //this.height = event.newRect.height;
  }
  ngOnInit(): void {
    this.num = window.innerWidth;
    if (this.num < 700) this.contestclass = 'big-container-block';
  }
  getrequest() {
    console.log('working');

    this.http
      .get<any>(`${environment.backend}/rankbooster/pasttest`)
      .subscribe((data) => {
        //Ch.a =
        //'https://mercury-t2.phonepe.com/transact/pg?token=YjQ2MTRmYzEwNDA1MzJkYWYyODQ4NTFmMzM2ODUzM2EzYmE1ODliMDMwOWVjMjBjNjFlZmM0NDIzNDM5YzllMDQ1MWE5Y2ViNmU2NjFiN2YwYjkwZjFiMWE3MGNmZmE1MWU0NGY2M2FhMTgxZTZhZjM0MzRkMTI1MWIzYWY1NWUzMDphMzJlYmJjZDViZWFjMTQ1NmMwOTQ2N2YxOTAxY2FlNg';
        //console.log(data.merchantUserId);
        this.loading = true;
        console.log(data.questions);
        //this.questionstring = data.questions[0].questionstring;
        let cs = JSON.stringify(data);
        this.paperservice.setpaper(cs);
        this.loading = false;
        this.router.navigate(['/questionviewer']);
        // this.openNewWindow(data.merchantUserId);
        //window.open(data.merchantUserId, '_blank');
      });
  }
  rankboosterpasttest(s: string) {
    let obj = JSON.parse('{"questions":"[]"}');
    let c: Array<question> = new Array();
    console.log('called');
    this.rankbooster.getpasttest(s).subscribe((data) => {
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
      this.loading = true;
      //console.log(data.questions);
      //this.questionstring = data.questions[0].questionstring;
      let cs = JSON.stringify(obj);
      console.log(obj.questions);
      //console.log(cs);
      this.paperservice.setpaper(cs);
      this.loading = false;
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
    if (s[2] === 'N') return 3;
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
}
