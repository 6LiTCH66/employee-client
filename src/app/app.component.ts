import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {AuthService} from "./services/auth.service";
import {Emitters} from "./emitters/emitters";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  authenticated = false
  title = 'employee-client';
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {

  }

  logout(){
    this.authService.logout()
    this.authenticated = false
    this.router.navigate(["/login"])
  }


  ngOnInit(): void {
    this.authService.startRefreshTokenTimer()
    Emitters.authEmitters.subscribe((auth: boolean) => {
      this.authenticated = auth
    })
  }
}
