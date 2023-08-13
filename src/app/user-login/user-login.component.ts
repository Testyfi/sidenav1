import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProfilepictureupdateService } from '../profilepictureupdate.service';
interface userprofile {
  path: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
  phonenumber: string | null | undefined;
}
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  @Output() logged = new EventEmitter<boolean>();

  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';
  loginemail: string = '';
  loginpass: string = '';
  chk: boolean = false;
  loading: boolean = false;
  refferalcode = '';
  profilepicturesrc = '';
  up: userprofile = {
    path: this.profilepicturesrc,
    name: this.firstName + ' ' + this.lastName,
    phonenumber: this.phone,
    email: this.email,
  };
  constructor(
    private http: HttpClient,
    private router: Router,
    public profile: ProfilepictureupdateService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard']);
      this.logged.emit(false);
    }
  }
  signup() {
    this.loading = true;
    const signupData = {
      first_name: this.firstName,
      last_name: this.lastName,
      phone: this.phone,
      email: this.email,
      password: this.password,
      refferal: this.refferalcode,
    };
    //console.log(signupData);
    this.http.post(`${environment.backend}/usersignup`, signupData).subscribe(
      (response) => {
        this.loading = false;
        alert('Signup successful. Please Login now.');
        this.chk = false;
      },
      (error) => {
        this.loading = false;
        alert(error.error);
        console.log(error);
      }
    );
  }
  login() {
    this.loading = true;
    const loginData = {
      email: this.loginemail,
      password: this.loginpass,
    };
    //console.log(loginData);

    this.http
      .post<{
        user_id: string;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        token: string;
        profile_picture: string;
        wallet: number;
      }>(`${environment.backend}/userlogin`, loginData)
      .subscribe(
        (response) => {
          console.log(response);
          this.loading = false;
          localStorage.setItem('token', response.token);

          this.logged.emit(false);
          this.up.name = response.first_name + ' ' + response.last_name;
          this.up.email = response.email;
          this.up.phonenumber = response.phone;
          this.up.path = response.profile_picture;
          this.profile.setprofile(this.up);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.loading = false;
          console.log(error);
          alert(error.error);
        }
      );
  }
}
