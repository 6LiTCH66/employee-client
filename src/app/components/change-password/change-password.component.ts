import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private authService: AuthService) { }

  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.required])
  confirm_password = new FormControl('', [Validators.required])

  resetPassword():void{
    if (this.email.value && this.password.value && this.confirm_password.value){
      this.authService.resetPassword(this.email.value, this.password.value, this.confirm_password.value)
    }
  }

  ngOnInit(): void {

  }

}
