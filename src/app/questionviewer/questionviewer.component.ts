import { Component, OnInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { Router } from '@angular/router';
import { CdTimerModule } from 'angular-cd-timer';
@Component({
  selector: 'app-questionviewer',
  templateUrl: './questionviewer.component.html',
  styleUrls: ['./questionviewer.component.scss'],
})
export class QuestionviewerComponent implements OnInit {
  constructor(private router: Router) {}
  num: number = 0;
  coll: boolean = false;
  list: boolean = true;
  single: boolean = false;
  multiple: boolean = false;
  numerical: boolean = false;
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
  }
}
