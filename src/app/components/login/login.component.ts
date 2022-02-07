import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor( private authService: AuthService, private http: HttpClient, private router: Router) {

  }
  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.required])

  login():void{
    if(this.email.value && this.password.value){
      this.authService.login(this.email.value, this.password.value)
    }
  }
  changePassword():void{
    this.router.navigate(["/change-password"])
  }

  ngOnInit(): void {
  }


}
