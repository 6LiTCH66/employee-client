import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_URL = "https://employee-webserver.herokuapp.com/auth"

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string){
    this.http.post(this.AUTH_URL + "/signin", {email, password}, {withCredentials: true}).subscribe(response => {
      localStorage.setItem("currentUser", JSON.stringify(response))
      this.router.navigate(["/"])
    })
  }

  register(email: string, password:string){
    this.http.post(this.AUTH_URL + "/signup", {email, password}).subscribe(res => this.router.navigate(["/login"]))
  }

  logout(){
    this.http.post(this.AUTH_URL + "/logout", "",{withCredentials: true}).subscribe(res => {
      localStorage.removeItem("currentUser")
    })
  }

}
