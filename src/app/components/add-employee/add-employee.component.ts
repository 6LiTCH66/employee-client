import {Component, Inject, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {Employee} from "../../models/employee";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddEmployeeComponent>,public employeeService: EmployeeService, @Inject(MAT_DIALOG_DATA) public employee: Employee) { }

  employeeForm: any;

  formControl = new FormControl('', [
    Validators.required
  ])

  getErrorMessage() {

    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
    })
  }
  submit() {
    // emppty stuff
  }
  onNoClick():void{
    this.dialogRef.close();
  }

  public confirmAdd():void{
    this.employeeService.addEmployee(this.employee);
    //console.log(this.employee)

  }

}
