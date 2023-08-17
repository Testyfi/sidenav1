import { Injectable, Signal, signal } from '@angular/core';
import { userprofile } from './profile';
import { userdata } from './profiledata';
@Injectable({
  providedIn: 'root',
})
export class ProfilepictureupdateService {
  constructor() {}
  data: userprofile = userdata;
  profiledatasignal: Signal<userprofile> = signal(this.data);
  setprofile(data: userprofile) {
    this.profiledatasignal = signal(data);

    //console.log(data);
  }
  getprofile() {
    return this.profiledatasignal;
  }
}
