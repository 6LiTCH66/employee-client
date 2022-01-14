import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {EmployeeService} from './services/employee.service'
import {MatTableDataSource} from "@angular/material/table";
import {AddEmployeeComponent} from "./components/add-employee/add-employee.component";
import {MatDialog} from "@angular/material/dialog";
import {Employee} from "./models/employee";
import {DeleteEmployeeComponent} from "./components/delete-employee/delete-employee.component";
import {EditEmployeeComponent} from "./components/edit-employee/edit-employee.component";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'employee-client';
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'location', 'birthday', 'created_at', 'updated_at', 'actions'];
  dataSource = new MatTableDataSource<Employee>();


  constructor(private employees: EmployeeService, public dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort!:MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort){
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  addNew(){
    this.dialog.open(AddEmployeeComponent, {
      data: {employee: Employee}
    }).afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  deleteEmployee(id: number, first_name: string, last_name:string, location:string, birthday:Date, created_at: Date, updated_at:Date){
    this.dialog.open(DeleteEmployeeComponent, {
      data: {id:id, first_name: first_name, last_name: last_name, location:location, birthday: birthday, created_at: created_at, updated_at:updated_at}
    }).afterClosed().subscribe(result => {
      this.refresh();
    })
  }
  updateEmployee(id: number, first_name: string, last_name:string, location:string, birthday:Date){
    this.dialog.open(EditEmployeeComponent, {
      data: {id:id, first_name: first_name, last_name: last_name, location:location, birthday: birthday}
    }).afterClosed().subscribe(result => {
      this.refresh();
    })
  }

  refresh() {
    this.employees.getEmployees().subscribe((data) => {
      this.dataSource.data = data;
    })
  }


  ngOnInit(): void {
    this.refresh();
  }

}
