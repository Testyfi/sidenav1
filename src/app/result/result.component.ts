import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetpaperserviceService } from '../getpaperservice.service';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  constructor(
    private router: Router,
    public paperservice: GetpaperserviceService
  ) {}
  right = 0;
  wrong = 0;
  unattempted = 0;
  reattempt() {
    this.router.navigate(['/questionviewer']);
  }
  analysis() {
    this.router.navigate(['/analysis']);
  }

  ngOnInit(): void {
    this.right = this.paperservice.right;
    this.wrong = this.paperservice.wrong;
    this.unattempted = this.paperservice.unattempted;
    //console.log(this.paperservice.rightorwrong);
  }
}
