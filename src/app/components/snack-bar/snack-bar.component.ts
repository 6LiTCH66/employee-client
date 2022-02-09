import { Component } from '@angular/core';
import {MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {AuthService} from "../../services/auth.service";
@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent {

  constructor(private snackBar: MatSnackBar, private authService: AuthService) { }
  actionButtonLabel: string = 'Confirm';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 10000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  addExtraClass: boolean = false;

  openSnackBar(message: string, action: boolean):void {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(message, action ? this.actionButtonLabel : undefined, config
    ).onAction().subscribe(() => this.authService.verifyEmail())
  }

}
