import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {WebsocketService} from "../../services/websocket.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {WebscrapingService} from "../../services/webscraping.service";
import {WebScraping} from "../../models/WebScraping";
import {MatDialog} from "@angular/material/dialog";
import {AddHighlightComponent} from "../add-highlight/add-highlight.component";
import { ViewEncapsulation } from '@angular/core'


@Component({
  selector: 'app-vastused',
  templateUrl: './vastused.component.html',
  styleUrls: ['./vastused.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class VastusedComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id', 'user_id',
    'category_name', 'sub_category_name',
    'question_title', 'question_description',
    'question_date', 'answer_title',
    'answer_description', 'source', "actions"];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private webSocket: WebsocketService, private webScrapingService: WebscrapingService, public dialog: MatDialog) {

  }
  refresh(){
    this.webScrapingService.getVastused().subscribe(
      (data) => {
        // data = data.map(d =>
        // {d.answer_title = JSON.stringify(d.answer_title)
        //   return d})
        this.dataSource.data = data
      }
    )
  }

  addHighlights(id: number, question_title: string, question_description: string, answer_description:string): void{
    this.dialog.open(AddHighlightComponent, {
      data: {id: id, question_title: question_title, question_description:question_description, answer_description:answer_description}
    })
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
