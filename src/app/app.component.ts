import { Component } from '@angular/core';
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
export class AppComponent {
  loggedin = true;
  profilepicture = '';
  title = 'sidenav';
  isSideNavCollapsed = false;
  screenWidth = 0;
  sidehead = true;
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;

    this.isSideNavCollapsed = data.collapsed;
  }
  maximize(data: boolean) {
    this.sidehead = !data;
  }
  showsidehead() {
    this.sidehead = true;
  }
  changeprofile(data: string) {
    this.profilepicture = data;
    console.log(this.profilepicture);
    // console.log('hellow');
  }
  setlogged(status: boolean) {
    this.loggedin = status;
  }
}
