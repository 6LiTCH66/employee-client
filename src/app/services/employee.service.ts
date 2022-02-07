import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import { catchError } from 'rxjs/operators';
import {Employee} from "../models/employee";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly URL = 'https://employee-webserver.herokuapp.com/api/employee/'


  dataChange: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);

  dialogData: any;

  constructor(private http: HttpClient, private authService: AuthService) { }

  get data(): Employee[] {
    return this.dataChange.value;
  }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.URL, {withCredentials: true})
      .pipe(catchError(err => {
        if (err.status === 403){
          localStorage.removeItem("currentUser")
          localStorage.removeItem("initialTime")
        }
        return throwError(err.message)
      }))
  }

  addEmployee(employee: Employee): void{
    this.http.post(this.URL, employee, {withCredentials: true}).subscribe(data => {
      this.dialogData = employee;
    })
  }

  deleteEmployee(id: number): void{
    this.http.delete(this.URL + id, {withCredentials: true}).subscribe(() => {});
  }

  updateEmployee(employee: Employee): void{
    this.http.put(this.URL + employee.id, employee, {withCredentials: true}).subscribe(data =>[
      this.dialogData = employee
    ])
  }

}
