import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Employee} from "../models/employee";


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly URL = 'https://employee-webserver.herokuapp.com/api/employee/'


  dataChange: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);

  dialogData: any;

  constructor(private http: HttpClient) { }

  get data(): Employee[] {
    return this.dataChange.value;
  }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.URL, {withCredentials: true});
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
