import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProfilepictureupdateService } from '../profilepictureupdate.service';
import { userprofile } from 'src/app/profile';
import { userdata } from 'src/app/profiledata';
import { json } from 'express';

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
  forgetemail: string = '';
  loginpass: string = '';
  chk: boolean = false;
  loading: boolean = false;
  refferal_code = '';
  profilepicturesrc = '';
  verification: boolean = false;
  up: userprofile = userdata;
  mobileotp: string = '';
  emailotp: string = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    public profile: ProfilepictureupdateService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      let str: any = '';
      str = localStorage.getItem('token');

      let response = JSON.parse(str);
      //console.log(response.email);
      //let response = JSON.parse(localStorage.getItem('token'));
      this.up.name = response.first_name + ' ' + response.last_name;
      this.up.email = response.email;
      this.up.phonenumber = response.phone;
      this.up.path = response.profile_picture;
      this.up.wallet = response.wallet;
      this.up.token = response.token;
      this.up.purchased = response.purchased;
      this.up.user_id = response.user_id;

      this.profile.setprofile(this.up);
      this.router.navigate(['/dashboard']);
      this.logged.emit(false);
    }
  }
  userverification() {
    this.loading = true;
    const signupData = {
      first_name: this.firstName,
      // last_name: this.lastName,
      phone: this.phone,
      email: this.email,
      // password: this.password,
      // referral_code: this.refferal_code,
    };
    //console.log(signupData);
    this.http.post(`${environment.backend}/usersignup`, signupData).subscribe(
      (response) => {
        this.loading = false;
        alert(' Please Verify Your Mobile & Email.');
        // this.chk = false;
        this.verification = true;
      },
      (error) => {
        this.loading = false;
        console.log(error.error);
      }
    );
  }
  signup() {
    this.loading = true;
    const signupData = {
      first_name: this.firstName,
      last_name: this.lastName,
      phone: this.phone,
      email: this.email,
      password: this.password,
      referral_code: this.refferal_code,
      secret_code: this.emailotp,
      otp: this.mobileotp,
    };
    //console.log(signupData);
    this.http.post(`${environment.backend}/userverify`, signupData).subscribe(
      (response) => {
        this.loading = false;
        alert('Signup successful. Please Login now.');
        this.chk = false;
      },
      (error) => {
        this.loading = false;
        alert(error.error);
        console.log(error.error);
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
        purchased: boolean;
      }>(`${environment.backend}/userlogin`, loginData)
      .subscribe(
        (response) => {
          // console.log(response);
          this.loading = false;
          localStorage.setItem('token', JSON.stringify(response));

          this.logged.emit(false);
          this.up.name = response.first_name + ' ' + response.last_name;
          this.up.email = response.email;
          this.up.phonenumber = response.phone;
          this.up.path = response.profile_picture;
          this.up.wallet = response.wallet;
          this.up.token = response.token;
          this.up.purchased = response.purchased;
          this.up.user_id = response.user_id;

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
  forget = false;
  forgetcall() {
    this.forget = true;
  }
  forgetoff() {
    this.forget = false;
  }

  forgotpassword() {
    this.loading = true;
    const data = {
      email: this.forgetemail,
    };
    this.http.post<{}>(`${environment.backend}/forgotpass`, data).subscribe(
      (response) => {
        console.log(response);
        this.forget = false;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        alert(error.error);
        this.loading = false;
      }
    );
  }
}
