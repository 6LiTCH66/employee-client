import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor( private authService: AuthService, private router:Router) {

  }

  email = new FormControl('', [Validators.required])
  password = new FormControl('', [Validators.required])
  register():void{
    console.log(this.email.value, this.password.value)

    if(this.email.value && this.password.value){
      this.authService.register(this.email.value, this.password.value)
    }


  }

  ngOnInit(): void {
  }

}
