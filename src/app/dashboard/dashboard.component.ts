import { Component, OnInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  num: number = 0;
  contestclass = 'big-container-flex';
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
}
