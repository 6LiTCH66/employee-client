import {Component, Inject, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {Employee} from "../../models/employee";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators, FormGroup} from "@angular/forms";
import{City} from "../../models/city"


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit {

  cities: City[] = [
    {value: 'Tallinn', viewValue: 'Tallinn'},
    {value: 'Narva', viewValue: 'Narva'},
    {value: 'Tartu', viewValue: 'Tartu'},
    {value: 'Viljandi', viewValue: 'Viljandi'},
    {value: 'Rakvere', viewValue: 'Rakvere'},
    {value: 'Maardu', viewValue: 'Maardu'},
  ]

  constructor(public dialogRef: MatDialogRef<AddEmployeeComponent>,public employeeService: EmployeeService, @Inject(MAT_DIALOG_DATA) public employee: Employee) { }

  employeeForm: any;
  selectedValue = new FormControl();
  MOBILE_PATTERN = /^[0-9]{8,8}$/

  formControl = new FormControl("", [
    Validators.required,
    Validators.email

  ])
  email = new FormControl('', [Validators.required, Validators.email]);
  telephone = new FormControl('', [Validators.pattern(this.MOBILE_PATTERN), Validators.maxLength(8)])

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

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
    })

    this.employee.location = this.selectedValue.value
  }
  submit() {
    // emppty stuff
  }

  getSelectedValue(data:any){
    //this.employee.location = data.value;
  }

  onNoClick():void{
    this.dialogRef.close();
  }

  public confirmAdd():void{
    this.employeeService.addEmployee(this.employee);
    //console.log(this.employee)

  }

}
