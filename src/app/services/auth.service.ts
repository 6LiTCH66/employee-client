import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_URL = "https://employee-webserver.herokuapp.com/auth"
  private readonly TOKEN_URL = 'https://employee-webserver.herokuapp.com/auth/token'


  constructor(private http: HttpClient, private router: Router) {

  }


  login(email: string, password: string){
    this.http.post<any>(this.AUTH_URL + "/signin", {email, password}, {withCredentials: true}).subscribe((response) => {
      localStorage.setItem("currentUser", JSON.stringify(response))
      localStorage.setItem("initialTime", String((new Date()).getTime()));

      this.startRefreshTokenTimer();
      this.router.navigate(["/"])
    })
  }

  register(email: string, password:string){
    this.http.post(this.AUTH_URL + "/signup", {email, password}).subscribe(res => this.router.navigate(["/login"]))
  }

  logout(){
    this.http.post(this.AUTH_URL + "/logout", "",{withCredentials: true}).subscribe(res => {
      localStorage.removeItem("currentUser")
      this.stopRefreshTokenTimer()

    })
  }


  refreshToken(){
    return this.http.post<any>(this.TOKEN_URL, {}, {withCredentials: true}).pipe(map((response) => {
      this.startRefreshTokenTimer()
      return response;
    }))
  }

  private refreshTokenTimeout: any;

  startRefreshTokenTimer(){
    if(localStorage.getItem("currentUser")){
      var waitTime = 840000;
      var executionTime;
      var initialTime = localStorage.getItem("initialTime");
      if (initialTime === null) {
        localStorage.setItem("initialTime", String((new Date()).getTime()));
        executionTime = waitTime;
      }
      else {
        executionTime = parseInt(initialTime, 10) + waitTime - (new Date()).getTime();
        if (executionTime < 0) executionTime = 0;
      }

      this.refreshTokenTimeout = setTimeout(() => {
        this.refreshToken().subscribe()
        localStorage.removeItem("initialTime");
      }, executionTime)
    }

  }

  stopRefreshTokenTimer(){
    console.log("stopped")
    localStorage.removeItem("initialTime");
    clearInterval(this.refreshTokenTimeout)
  }

}
