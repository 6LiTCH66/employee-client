import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {WebsocketService} from "../../services/websocket.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {WebscrapingService} from "../../services/webscraping.service";
import {WebScraping} from "../../models/WebScraping";


@Component({
  selector: 'app-vastused',
  templateUrl: './vastused.component.html',
  styleUrls: ['./vastused.component.css']
})


export class VastusedComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id', 'user_id',
    'category_name', 'sub_category_name',
    'question_title', 'question_description',
    'question_date', 'answer_title',
    'answer_description', 'source'];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private webSocket: WebsocketService, private webScrapingService: WebscrapingService) {

  }
  refresh(){
    this.webScrapingService.getVastused().subscribe(
      (data) => {
        this.dataSource.data = data
      }
    )
  }


  start(): void{
    this.webSocket.emit("start-client", "start test")
  }

  stop(): void{
    this.webSocket.emit("stop-client", "stop test")
  }

  ngOnInit(): void {
    this.refresh()
    this.webSocket.listen("test event").subscribe((data) => {
      console.log(data)
    })
  }

}
