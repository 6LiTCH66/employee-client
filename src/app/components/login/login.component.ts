import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private authService: AuthService) {

  }
  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.required])

  login():void{
    if(this.email.value && this.password.value){
      this.authService.login(this.email.value, this.password.value)
    }


  }


  ngOnInit(): void {

  }

}
