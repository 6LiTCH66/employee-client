import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly URL = 'https://employee-webserver.herokuapp.com/api/user'

  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])

  constructor(private http: HttpClient) { }

  get date(): any[]{
    return this.dataChange.value
  }

  getUsers(): Observable<any[]>{
    return this.http.get<any[]>(this.URL, {withCredentials: true})
      .pipe(catchError(err => {
        if(err.status === 403){
          localStorage.removeItem("currentUser")
          localStorage.removeItem("initialTime")
        }
        return throwError(err.message)
      }))
  }
}
