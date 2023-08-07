import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  chart: any;

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
        dataPoints: [
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
        ],
      },

      {
        type: 'line',
        showInLegend: true,
        name: 'Test Score',

        dataPoints: [
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
        ],
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
          { x: new Date(2022, 8, 15), y: 5360 },
        ],
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
}
