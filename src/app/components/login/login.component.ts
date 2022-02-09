import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Emitters} from "../../emitters/emitters";
import{
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

import {SnackBarComponent} from "../snack-bar/snack-bar.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor( private authService: AuthService, private http: HttpClient, private router: Router, public snackBar:MatSnackBar, private snack: SnackBarComponent) {

  }
  errorMessage: any
  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.required])

  login():void{
    if(this.email.value && this.password.value){
      this.authService.login(this.email.value, this.password.value)

      Emitters.errorEmitters.subscribe((error: string) => {
        if (JSON.parse(error) === "Confirm your email"){
          this.snack.openSnackBar(JSON.parse(error), true)
        }
        else{
          this.snack.openSnackBar(JSON.parse(error), false)
        }

      })
    }
  }

  changePassword():void{
    this.router.navigate(["/change-password"])
  }

  ngOnInit(): void {

  }


}
