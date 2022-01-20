import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Employee} from "../../models/employee";
import {EmployeeService} from "../../services/employee.service";
import {MatDialog} from "@angular/material/dialog";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {AddEmployeeComponent} from "../add-employee/add-employee.component";
import {DeleteEmployeeComponent} from "../delete-employee/delete-employee.component";
import {EditEmployeeComponent} from "../edit-employee/edit-employee.component";
import {HttpClient} from "@angular/common/http";
import {Emitters} from "../../emitters/emitters";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  private readonly TOKEN_URL = 'https://employee-webserver.herokuapp.com/auth/token'

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'location', 'birthday','email','telephone','created_at', 'updated_at', 'actions'];
  dataSource = new MatTableDataSource<Employee>();

  constructor(private employees: EmployeeService, public dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer, private http: HttpClient) {}

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
  deleteEmployee(id: number, first_name: string, last_name:string, location:string, birthday:Date,email:string,telephone:string, created_at: Date, updated_at:Date){
    this.dialog.open(DeleteEmployeeComponent, {
      data: {id:id, first_name: first_name, last_name: last_name, location:location, birthday: birthday,email:email,telephone:telephone, created_at: created_at, updated_at:updated_at}
    }).afterClosed().subscribe(result => {
      this.refresh();
    })
  }

  updateEmployee(id: number, first_name: string, last_name:string, location:string, birthday:Date,email:string,telephone:string){
    this.dialog.open(EditEmployeeComponent, {
      data: {id:id, first_name: first_name, last_name: last_name, location:location, birthday: birthday,email:email,telephone:telephone}
    }).afterClosed().subscribe(result => {
      this.refresh();
    })
  }

  refresh() {
    this.employees.getEmployees().subscribe((data) => {
      this.dataSource.data = data;
      Emitters.authEmitters.emit(true)
    }, error => {
      Emitters.authEmitters.emit(false)
    })
  }

  ngOnInit(): void {
    this.refresh();
  }


}
