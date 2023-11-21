import { Component, OnInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetpaperserviceService } from '../getpaperservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    public paperservice: GetpaperserviceService,
    private http: HttpClient
  ) {}
  private apiUrl = 'http://localhost:8080';
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

    this.http.get<any>(this.apiUrl).subscribe((data) => {
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
}
