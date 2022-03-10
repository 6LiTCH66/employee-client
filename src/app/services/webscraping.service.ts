import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {WebScraping} from "../models/WebScraping";
import {SnackBarComponent} from "../components/snack-bar/snack-bar.component";

@Injectable({
  providedIn: 'root'
})
export class WebscrapingService {

  private readonly URL = "https://employee-webserver.herokuapp.com/scraping/vastused/"
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])

  dialogData: any;

  constructor(private http: HttpClient, public snackBar: SnackBarComponent) { }

  get data(): any[]{
    return this.dataChange.value
  }

  getVastused(): Observable<any[]>{
    return this.http.get<any[]>(this.URL, {withCredentials: true})
  }

  updateVastused(bodyText: any, id: number): void{
    //alert(JSON.stringify(bodyText) + "\n" + this.URL + id)
    this.http.put(this.URL + id, bodyText, {withCredentials: true})
      .subscribe(data =>  {
        this.dialogData = data
      })
    this.snackBar.openSnackBar("Data was successful highlighted", false)
  }
}
