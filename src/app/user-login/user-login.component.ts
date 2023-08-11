import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) this.router.navigate(['/home']);
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

    this.http.post(`${environment.backend}/userlogin`, loginData).subscribe(
      (response) => {
        this.loading = false;
        localStorage.setItem('token', response.toString());

        this.logged.emit(false);
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
