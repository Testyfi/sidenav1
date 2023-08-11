import {
  Component,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { ProfilepictureupdateService } from '../profilepictureupdate.service';
import {
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
  name: string | null | undefined = 'Anuj Kumar Sharma';
  email: string | null | undefined = 'anuj.as598@gmail.com';
  mobilenumber: string | null | undefined = '9517415732';

  mbscreen = true;
  //profileupdateform = FormGroup;
  constructor(public profile: ProfilepictureupdateService) {}

  form = new FormGroup({
    name: new FormControl(this.name),

    emailform: new FormControl(this.email, [
      Validators.required,
      Validators.email,
    ]),
    mobile: new FormControl(this.mobilenumber, [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
    ]),

    profilepicture: new FormControl(),
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
  propicsrc = '/assets/user3.jpg';
  getloadFile(event: any) {
    //let element: HTMLElement = document.getElementById('profilepicture');
    this.propicsrc = URL.createObjectURL(event.target.files[0]);
    console.log(this.propicsrc);
    // console.log(event);
  }
  updat = false;
  update() {
    this.updat = true;
  }
  setprofile() {
    this.updat = false;
    //console.log(document.getElementById('updateprofile'));
    this.profile.setprofile(this.propicsrc);
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
    this.name = this.form.value.name;
    this.email = this.form.value.emailform;
    this.mobilenumber = this.form.value.mobile;
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
}
