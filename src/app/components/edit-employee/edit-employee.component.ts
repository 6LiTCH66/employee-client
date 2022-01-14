import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EmployeeService} from "../../services/employee.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {City} from "../../models/city";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public employee: any, public employeeService:EmployeeService) { }

  employeeForm: any;
  selectedValue = new FormControl();
  MOBILE_PATTERN = /^[0-9]{8,8}$/

  cities: City[] = [
    {value: 'Tallinn', viewValue: 'Tallinn'},
    {value: 'Narva', viewValue: 'Narva'},
    {value: 'Tartu', viewValue: 'Tartu'},
    {value: 'Viljandi', viewValue: 'Viljandi'},
    {value: 'Rakvere', viewValue: 'Rakvere'},
    {value: 'Maardu', viewValue: 'Maardu'},
  ]

  formControl = new FormControl('', [
    Validators.required
  ])
  email = new FormControl('', [Validators.required, Validators.email]);
  telephone = new FormControl('', [Validators.pattern(this.MOBILE_PATTERN), Validators.maxLength(8)])

  getErrorMessage() {

    return this.formControl.hasError('required') ? 'Required field' : '';
  }
  getErrorEmailMessage() {
    return this.email.hasError('required') ? 'Required field' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  getErrorTelephoneMessage(){
    return this.email.hasError('required') ? 'Required field' :
      this.email.hasError('pattern') ? 'Only numbers' :
        '';
  }

  submit() {

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
