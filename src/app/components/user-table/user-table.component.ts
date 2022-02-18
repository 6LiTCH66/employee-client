import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../services/user.service";
import {Emitters} from "../../emitters/emitters";
import {Router} from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  displayedColumns: string[] = ['user_id', 'login_at', 'logout_at', 'ip', 'agent','isOnline'];
  dataSource = new MatTableDataSource<any>();

  constructor(private userService: UserService, private router: Router, private _liveAnnouncer: LiveAnnouncer) { }

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

  refresh(){
    this.userService.getUsers().subscribe(
      (data) =>{
        this.dataSource.data = data;
        Emitters.authEmitters.emit(true)
      }, error => {
        this.router.navigate(["/login"]).then(() => {
          window.location.reload()
        })
        Emitters.authEmitters.emit(false)
      }
    )
  }

  ngOnInit(): void {
    this.refresh();
  }

}
