import { Component, OnInit } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RankboostertestService } from '../rankboostertest.service';
import { question, questiondata } from '../dashboard/questiontype';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StatisticsService } from '../statistics.service';
interface axistype {
  x: Date;
  y: number;
}
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private rnkbo: RankboostertestService,
    private statisticsservice: StatisticsService
  ) {}
  ngOnInit(): void {
    //this.statistics();
    //console.log('working');
    //console.log(typeof this.dps[0]);
    //console.log(this.dps1);
  }
  //dps1 = [{ x: new Date(2022, 8, 1), y: 360 }];
  //dps2 = [{ x: new Date(2022, 8, 1), y: 300, MaxScore: 360 }];

  dps1: any = this.statisticsservice.dps1;
  dps2: any = this.statisticsservice.dps2;
  dps3: any = this.statisticsservice.dps3;
  dps4: any = this.statisticsservice.dps4;
  chart: any;
  Data: any;
  chartOptions = {
    animationEnabled: true,
    theme: 'light2',
    title: {
      text: 'Score',
      // 'Test Score out of 360', //vs Projected Sales',
    },
    axisX: {
      valueFormatString: 'D MMM',
    },
    axisY: {
      title: 'Score',
    },

    toolTip: {
      shared: true,
    },
    legend: {
      cursor: 'pointer',

      itemclick: function (e: any) {
        if (
          typeof e.dataSeries.visible === 'undefined' ||
          e.dataSeries.visible
        ) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      },
    },
    data: [
      {
        type: 'bubble',
        showInLegend: true,
        name: 'MaxScore',
        xValueFormatString: 'MMM DD, YYYY',
        dataPoints: this.dps1,
        /*
          { x: new Date(2022, 8, 1), y: 360 },

          { x: new Date(2022, 8, 2), y: 360 },
          { x: new Date(2022, 8, 3), y: 360 },
          { x: new Date(2022, 8, 4), y: 360 },
          { x: new Date(2022, 8, 5), y: 360 },
          { x: new Date(2022, 8, 6), y: 360 },
          { x: new Date(2022, 8, 7), y: 360 },
          { x: new Date(2022, 8, 8), y: 360 },
          { x: new Date(2022, 8, 9), y: 360 },
          { x: new Date(2022, 8, 10), y: 360 },
          { x: new Date(2022, 8, 11), y: 360 },
          { x: new Date(2022, 8, 12), y: 360 },
          { x: new Date(2022, 8, 13), y: 360 },
          { x: new Date(2022, 8, 14), y: 360 },
          { x: new Date(2022, 8, 15), y: 360 },
          */
      },

      {
        type: 'line',
        showInLegend: true,
        name: 'Test Score',

        dataPoints: this.dps2,
        /*
          { x: new Date(2022, 8, 1), y: 300, MaxScore: 360 },
          { x: new Date(2022, 8, 2), y: 310, MaxScore: 360 },
          { x: new Date(2022, 8, 3), y: 210, MaxScore: 360 },
          { x: new Date(2022, 8, 4), y: 56, MaxScore: 360 },
          { x: new Date(2022, 8, 5), y: 54, MaxScore: 360 },
          { x: new Date(2022, 8, 6), y: 350, MaxScore: 360 },
          { x: new Date(2022, 8, 7), y: 54, MaxScore: 360 },
          { x: new Date(2022, 8, 8), y: 69, MaxScore: 360 },
          { x: new Date(2022, 8, 9), y: 65, MaxScore: 360 },
          { x: new Date(2022, 8, 10), y: 66, MaxScore: 360 },
          { x: new Date(2022, 8, 11), y: 63, MaxScore: 360 },
          { x: new Date(2022, 8, 12), y: 67, MaxScore: 360 },
          { x: new Date(2022, 8, 13), y: 66, MaxScore: 360 },
          { x: new Date(2022, 8, 14), y: 56, MaxScore: 360 },
          { x: new Date(2022, 8, 15), y: 64, MaxScore: 360 },
          */
      },
    ],
  };

  chartOptions2 = {
    animationEnabled: true,
    theme: 'light2',
    title: {
      text: 'Rank', //vs Projected Sales',
    },
    axisX: {
      valueFormatString: 'D MMM',
    },
    axisY: {
      title: 'Rank',
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: 'pointer',
      itemclick: function (e: any) {
        if (
          typeof e.dataSeries.visible === 'undefined' ||
          e.dataSeries.visible
        ) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      },
    },
    data: [
      /*
      {
        type: 'bubble',
        showInLegend: true,
        name: 'Max Rank',
        xValueFormatString: 'MMM DD, YYYY',
        dataPoints: [
          { x: new Date(2022, 8, 1), y: 1000 },
          { x: new Date(2022, 8, 2), y: 500 },
          { x: new Date(2022, 8, 3), y: 300 },
          { x: new Date(2022, 8, 4), y: 3600 },
          { x: new Date(2022, 8, 5), y: 3060 },
          { x: new Date(2022, 8, 6), y: 3600 },
          { x: new Date(2022, 8, 7), y: 1360 },
          { x: new Date(2022, 8, 8), y: 3260 },
          { x: new Date(2022, 8, 9), y: 3360 },
          { x: new Date(2022, 8, 10), y: 4360 },
          { x: new Date(2022, 8, 11), y: 5360 },
          { x: new Date(2022, 8, 12), y: 6360 },
          { x: new Date(2022, 8, 13), y: 7360 },
          { x: new Date(2022, 8, 14), y: 8360 },
          { x: new Date(2022, 8, 15), y: 9360 },
        ],
      },
*/

      {
        type: 'line',
        showInLegend: true,
        name: 'Rank',

        dataPoints: this.dps3,
      },
    ],
  };
  maxrank = {
    //colorSet: '#ffffff',
    animationEnabled: true,
    theme: 'light2',
    title: {
      text: 'Students appear in Exam', //vs Projected Sales',
    },
    axisX: {
      valueFormatString: 'D MMM',
    },
    axisY: {
      title: 'Students appear in Exam',
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: 'pointer',
      itemclick: function (e: any) {
        if (
          typeof e.dataSeries.visible === 'undefined' ||
          e.dataSeries.visible
        ) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      },
    },
    data: [
      {
        type: 'line',
        showInLegend: true,
        name: 'Students appear in Exam',
        xValueFormatString: 'MMM DD, YYYY',
        dataPoints: this.dps4,
      },

      /*
      {
        type: 'line',
        showInLegend: true,
        name: 'Rank',

        dataPoints: [
          { x: new Date(2022, 8, 1), y: 600 },
          { x: new Date(2022, 8, 2), y: 100 },
          { x: new Date(2022, 8, 3), y: 102 },
          { x: new Date(2022, 8, 4), y: 50 },
          { x: new Date(2022, 8, 5), y: 54 },
          { x: new Date(2022, 8, 6), y: 55 },
          { x: new Date(2022, 8, 7), y: 54 },
          { x: new Date(2022, 8, 8), y: 69 },
          { x: new Date(2022, 8, 9), y: 65 },
          { x: new Date(2022, 8, 10), y: 66 },
          { x: new Date(2022, 8, 11), y: 63 },
          { x: new Date(2022, 8, 12), y: 67 },
          { x: new Date(2022, 8, 13), y: 66 },
          { x: new Date(2022, 8, 14), y: 56 },
          { x: new Date(2022, 8, 15), y: 64 },
        ],
      },
      */
    ],
  };

  statistics() {
    const body = {};
    this.http
      .post<any>(`${environment.backend}/statistics/userstatistics`, body, {
        headers: this.getHeader(),
      })
      .subscribe((data) => {
        this.Data = data.data;
        //this.dps1 = [];
        //this.dps2 = [];
        for (let i = 0; i < this.Data.length; i++) {
          //console.log('working');
          let s = this.Data[i].date.split('/');
          //console.log(s);

          let maxscore = this.Data[i].maxscore;

          this.dps1.push({
            x: new Date(Number(s[0]), Number(s[1]) - 1, Number(s[2])),
            y: Number(maxscore),
          });
        }
        for (let i = 0; i < this.Data.length; i++) {
          // console.log('working');
          let s = this.Data[i].date.split('/');
          // console.log(new Date(Number(s[0]), Number(s[1]), Number(s[2])));
          let maxscore = this.Data[i].maxscore;
          let userscore = this.Data[i].userscore;
          this.dps2.push({
            x: new Date(Number(s[0]), Number(s[1]) - 1, Number(s[2])),
            y: Number(userscore),
            MaxScore: Number(maxscore),
          });
          //{ x: new Date(2022, 8, 1), y: 300, MaxScore: 360 },
        }
        console.log(this.Data);
      });
    //console.log(htrs);
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
}
