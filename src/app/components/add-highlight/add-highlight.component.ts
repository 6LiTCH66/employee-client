import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WebscrapingService} from "../../services/webscraping.service";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";

@Component({
  selector: 'app-add-highlight',
  templateUrl: './add-highlight.component.html',
  styleUrls: ['./add-highlight.component.css']
})
export class AddHighlightComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddHighlightComponent>, @Inject(MAT_DIALOG_DATA) public vastused: any, public vastusedService: WebscrapingService, public snackBar: SnackBarComponent) { }

  onNoClick(): void{
    this.dialogRef.close()
  }

  questionTitHighlight!: string
  questionDescHighlight!: string
  answerDescHighlight!: string

  questionTitleSelected(ev: any): void{
    const start = ev.target.selectionStart;
    const end = ev.target.selectionEnd;
    this.questionTitHighlight =
      ev.target.value.replace(
        ev.target.value.substr(start, end - start),
        "<span class='highlight'>"
        + ev.target.value.substr(start, end - start) + "</span>")
  }


  questionDescriptionSelected(ev: any): void{
    const start = ev.target.selectionStart;
    const end = ev.target.selectionEnd;
    this.questionDescHighlight =
    ev.target.value.replace(
      ev.target.value.substr(start, end - start),
      "<span class='highlight'>"
      + ev.target.value.substr(start, end - start) + "</span>")
  }

  answerDescriptionSelected(ev: any): void{
    const start = ev.target.selectionStart;
    const end = ev.target.selectionEnd;
    this.answerDescHighlight =
      ev.target.value.replace(
        ev.target.value.substr(start, end - start),
        "<span class='highlight'>"
        + ev.target.value.substr(start, end - start) + "</span>")
  }

  // confirmUpdate(bodyText: any, id: number): void{
  //   this.vastusedService.updateVastused(bodyText)
  // }

  questionTitleText(): void{
    if (this.questionTitHighlight){
      var toJson = {question_title:this.questionTitHighlight}
      this.vastusedService.updateVastused(toJson, this.vastused.id);
      this.onNoClick();
    }
    else {
      this.snackBar.openSnackBar("Please highlight the text!", false)
    }

  }

  questionDescriptionText(): void{
    if (this.questionDescHighlight){
      var toJson = {question_description:this.questionDescHighlight}
      this.vastusedService.updateVastused(toJson, this.vastused.id);
      this.onNoClick();
    }
    else {
      this.snackBar.openSnackBar("Please highlight the text!", false)
    }
  }

  answerDescriptionText(): void{
    if (this.answerDescHighlight){
      var toJson = {answer_description:this.answerDescHighlight}
      this.vastusedService.updateVastused(toJson, this.vastused.id);
      this.onNoClick();
    }
    else {
      this.snackBar.openSnackBar("Please highlight the text!", false)
    }

  }

  getInnerHTML(val: any){
    return val.replace(/(<([^>]+)>)/ig,'');
  }



  ngOnInit(): void {

  }

}
