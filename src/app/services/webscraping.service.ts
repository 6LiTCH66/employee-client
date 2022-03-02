import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {WebScraping} from "../models/WebScraping";

@Injectable({
  providedIn: 'root'
})
export class WebscrapingService {

  private readonly URL = "https://employee-webserver.herokuapp.com/scraping/vastused"
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])


  constructor(private http: HttpClient) { }

  get data(): any[]{
    return this.dataChange.value
  }

  getVastused(): Observable<any[]>{
    return this.http.get<any[]>(this.URL, {withCredentials: true})
  }
}
