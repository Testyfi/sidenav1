import {
  Component,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Injectable, Signal, signal } from '@angular/core';

import { ProfilepictureupdateService } from '../profilepictureupdate.service';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { ResizedEvent } from 'angular-resize-event';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
//import { Event } from 'socket.io';
import { Event } from '@angular/router';
import { json } from 'express';
import { userprofile } from 'src/app/profile';
import { userdata } from 'src/app/profiledata';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public profile: ProfilepictureupdateService
  ) {}

  // profiledatasignal: Signal<userprofile> = signal(this.profiledata);
  mbscreen = true;
  hide = true;
  loading = false;
  //profileupdateform = FormGroup;

  form = new FormGroup({
    profilepicture: new FormControl(),
  });
  formpassword = new FormGroup({
    oldpassword: new FormControl(''),
    newpassword: new FormControl(''),
  });
  /*
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  */

  @Output() changeprofile: EventEmitter<string> = new EventEmitter();
  matcher = new MyErrorStateMatcher();
  /*
  OTP = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{6}$'),
  ]);
  */
  getErrorMessage() {
    let l: any = this.form;
    if (l === null) {
      l = new FormControl();
    }
    if (l.get('mobile').hasError('required')) {
      return 'You must enter a value';
    }

    return l.get('mobile').hasError('pattern')
      ? 'Please, Enter 10 digit Mobile Number'
      : '';
  }
  mbl = '';
  getNumber(mobile: string) {
    this.mbl = mobile;
  }
  propicsrc = this.profile.getprofile()().path;
  getloadFile(event: any) {
    //let element: HTMLElement = document.getElementById('profilepicture');
    // console.log(event.target.files[0]);
    const c = event.target.files[0];
    this.propicsrc = URL.createObjectURL(event.target.files[0]);
    this.form.get('profilepicture')?.setValue(c);
    //console.log(this.propicsrc);
    // console.log(event);
  }
  updat = false;
  update() {
    this.updat = true;
  }
  setprofile() {
    this.loading = true;
    this.updat = false;
    console.log(this.form.get('profilepicture')?.value);

    const formData = new FormData();
    formData.append('profileImage', this.form.get('profilepicture')?.value);
    this.http
      .put(
        `${environment.backend}/users/${
          this.profile.getprofile()().user_id
        }/profile`,
        formData,
        {
          headers: this.getHeader(),
        }
      )
      .subscribe(
        (response) => {
          this.profile.getprofile()().path = this.propicsrc;
          let str: any = '';
          str = localStorage.getItem('token');
          localStorage.removeItem('token');
          let res = JSON.parse(str);

          res.profilepicturesrc = this.propicsrc;
          localStorage.setItem('token', JSON.stringify(res));

          this.loading = false;
          alert('Your Profile Changed Successfully');
          //console.log('success');
          // handle response
        },
        (error) => {
          alert(error.error);
          this.loading = false;
          // handle error
        }
      );
    //this.changeprofile.emit(this.propicsrc);
    // console.log(this.propicsrc);
    //console.log(updateprofile.value);
  }

  onResized(event: ResizedEvent) {
    let num = event.newRect.width;
    //this.height = event.newRect.height;

    // console.log(this.num);
    if (num < 500) {
      //console.log(this.num);
      this.mbscreen = false;
    } else {
      this.mbscreen = true;
    }
    //console.log('working');
  }
  ngOnInit(): void {
    let num = window.innerWidth;
    if (num < 600) {
      this.mbscreen = true;
      //console.log(this.num);
    }
  }
  getformValue() {
    //console.log(this.form.value.emailform);
    //console.log(this.form);
    this.setprofile();
  }
  getEmailErrorMessage() {
    let l: any = this.form;
    if (l === null) {
      l = new FormControl();
    }
    if (l.get('emailform').hasError('required')) {
      return 'You must enter a value';
    }

    return l.get('emailform').hasError('email') ? 'Not a valid email' : '';
  }
  getemailobject() {
    let l: any = this.form;
    if (l === null) {
      l = new FormControl();
    }
    return l;
  }
  getmobileobject() {
    let l: any = this.form;
    if (l === null) {
      l = new FormControl();
    }
    return l;
  }
  changepass = false;
  changepassword() {
    this.changepass = false;
    let str: any = '';
    str = this.formpassword.value.newpassword;
    if (str.length > 0) {
      str = this.formpassword.value.oldpassword;
      if (str.length > 0) {
        if (this.formpassword.value.newpassword != str) {
          this.loading = true;
          const changepassworddata = {
            existing_password: this.formpassword.value.oldpassword,
            new_password: this.formpassword.value.newpassword,
          };
          this.http
            .put(
              `${environment.backend}/users/${
                this.profile.getprofile()().user_id
              }/passwordchange`,
              changepassworddata,
              { headers: this.getHeader() }
            )
            .subscribe(
              (response) => {
                //handle success
                alert('password change success fully');
                this.loading = false;
              },
              (error) => {
                alert(error.error);
                this.loading = false;
                // handle error
              }
            );
        } else {
          alert('NewPassword and OldPassword is same');
        }
      }
    }
  }
  changepasscall() {
    this.changepass = true;
  }
  getHeader() {
    let str: any = '';
    str = localStorage.getItem('token');

    let response = JSON.parse(str);
    const token: string = response.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }
}
