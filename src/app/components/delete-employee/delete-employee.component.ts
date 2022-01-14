import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public employee: any, public employeeService: EmployeeService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void{
    this.employeeService.deleteEmployee(this.employee.id)
    //console.log(this.employee.id)

  }

  ngOnInit(): void {

  }

}
