import { Component, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { ResizedEvent } from 'angular-resize-event';
import { OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
})
export class IntroductionComponent implements OnInit {
  @Output() intro = new EventEmitter<boolean>();
  num: number = 0;
  title = 'Testtify For Jee ';
  constructor(
    private router: Router,
    private titleService: Title,
    private metaTagService: Meta
  ) {}
  tologinpage() {
    console.log('working');
    this.router.navigate(['/user-login']);
    this.intro.emit(false);
  }
  onResized(event: ResizedEvent) {
    this.num = event.newRect.width;
    //this.height = event.newRect.height;

    // console.log(this.num);

    if (this.num < 1200) {
      let e: any = document.getElementById('cardbody');
      e.style.display = 'block';
      e = document.getElementById('image');
      e.style.width = '100%';

      e = document.getElementById('welcomebox');
      e.style.width = '100%';
      //console.log("yes");
    } else {
      {
        let e: any = document.getElementById('cardbody');
        e.style.display = 'flex';
        e = document.getElementById('image');
        e.style.width = '50%';
        e = document.getElementById('welcomebox');
        e.style.width = '50%';
      }
    }
  }
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({
      name: 'description',
      content:
        'jee mains , jee advanced, jee mains test series, jee advanced test series, create your test,testtify,testify,',
    });
    this.num = window.innerWidth;
    if (this.num < 1200) {
      let e: any = document.getElementById('cardbody');
      e.style.display = 'block';
      e = document.getElementById('image');
      e.style.width = '100%';
      e = document.getElementById('welcomebox');
      e.style.width = '100%';
      //console.log("yes");
    } else {
      {
        let e: any = document.getElementById('cardbody');
        e.style.display = 'flex';
        e = document.getElementById('image');
        e.style.width = '50%';
        e = document.getElementById('welcomebox');
        e.style.width = '50%';
      }
    }
    if (localStorage.getItem('token')) {
      this.intro.emit(false);
    }
  }
}
