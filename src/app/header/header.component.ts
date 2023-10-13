import {
  Component,
  OnInit,
  Input,
  HostListener,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  signal,
  Signal,
} from '@angular/core';
import { userItems } from './useritems';
import { ProfilepictureupdateService } from '../profilepictureupdate.service';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import {
  animate,
  keyframes,
  animation,
  style,
  transition,
  trigger,
} from '@angular/animations';
interface userprofile {
  path: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
  phonenumber: string | null | undefined;
  wallet: number;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public profile: ProfilepictureupdateService,
    private http: HttpClient,
    private router: Router
  ) {}

  @Input() collapsed = false;
  @Input() screenWidth = 0;
  @Output() maximize: EventEmitter<boolean> = new EventEmitter();
  @Output() logout: EventEmitter<boolean> = new EventEmitter();
  //profilepicture = this.profile.message();
  profilepicturesignal: Signal<userprofile> = this.profile.getprofile();

  canShowSearchAsOverlay = false;
  userItems = userItems;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    console.log(this.profilepicturesignal().email);
  }
  getHeadClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }
    return styleClass;
  }
  checkCanShowSearchAsOverlay(innerWidth: number): void {
    if (innerWidth < 845) {
      this.canShowSearchAsOverlay = true;
    } else {
      this.canShowSearchAsOverlay = false;
    }
  }
  expand() {
    this.maximize.emit(true);
  }
  userfunction(lable: string) {
    if (lable == 'Profile') {
      this.router.navigate(['/settings']);
    } else {
      localStorage.removeItem('token');
      this.logout.emit(true);
    }
  }
}
