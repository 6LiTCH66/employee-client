import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EmployeeService} from "../../services/employee.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public employee: any, public employeeService:EmployeeService) { }

  employeeForm: any;

  formControl = new FormControl('', [
    Validators.required
  ])

  getErrorMessage() {

    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  submit() {
    // emppty stuff
  }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmUpdate(): void{
    this.employeeService.updateEmployee(this.employee);
  }

}
