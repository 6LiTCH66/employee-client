import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly TOKEN_URL = 'https://employee-webserver.herokuapp.com/auth/token'

  constructor( private authService: AuthService, private http: HttpClient) {

  }
  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.required])

  login():void{
    if(this.email.value && this.password.value){
      this.authService.login(this.email.value, this.password.value)
    }


  }

  newToken:any;


  ngOnInit(): void {
    if(localStorage.getItem("currentUser")){
      this.newToken = setInterval(() => {
        this.http.post(this.TOKEN_URL, "", {withCredentials: true}).subscribe(()=>{})
      }, 14 * 60 * 1000)

    }
  }

  ngOnDestroy(): void {
    clearInterval(this.newToken);
  }

}
