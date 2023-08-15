import { Injectable, Signal, signal } from '@angular/core';
interface userprofile {
  path: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
  phonenumber: string | null | undefined;
  wallet: number;
}
@Injectable({
  providedIn: 'root',
})
export class ProfilepictureupdateService {
  constructor() {}
  data: userprofile = {
    path: '/assets/user3.jpg',
    name: 'Anuj Kumar Sharma',
    email: 'anuj.as598@gmail.com',
    phonenumber: '9517415732',
    wallet: 0,
  };
  profiledatasignal: Signal<userprofile> = signal(this.data);
  setprofile(data: userprofile) {
    this.data.path = data.path;
    this.data.name = data.name;
    this.data.email = data.email;
    this.data.phonenumber = data.phonenumber;
    this.data.wallet = data.wallet;
    this.profiledatasignal = signal(this.data);

    //console.log(data);
  }
  getprofile() {
    return this.profiledatasignal;
  }
}
