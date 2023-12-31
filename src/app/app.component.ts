import { Component, OnInit } from '@angular/core';
import { AngularResizeEventModule } from 'angular-resize-event';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loggedin = true;
  profilepicture = '';
  title = 'sidenav';
  isSideNavCollapsed = false;
  screenWidth = 0;
  sidehead = true;
  intro: boolean = true;
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;

    this.isSideNavCollapsed = data.collapsed;
  }
  maximize(data: boolean) {
    this.sidehead = !data;
  }
  logout(data: boolean) {
    this.loggedin = data;
    console.log(this.loggedin);
  }
  showsidehead() {
    this.sidehead = true;
  }
  changeprofile(data: string) {
    this.profilepicture = data;
    // console.log(this.profilepicture);
    // console.log('hellow');
  }
  setlogged(status: boolean) {
    this.loggedin = status;
  }
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.intro = false;
    }
  }
  getintro(status: boolean) {
    this.intro = status;
  }
}
