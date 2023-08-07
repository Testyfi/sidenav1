import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfilepictureupdateService {
  constructor() {}
  path = signal('/assets/user3.jpg');
  setprofile(data: string) {
    this.path.set(data);
    //console.log(data);
  }
  getprofile() {
    return this.path();
  }
}
