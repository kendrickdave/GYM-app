import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-list-registration',
  templateUrl: './list-registration.component.html',
  styleUrls: ['./list-registration.component.scss']
})
export class ListRegistrationComponent implements OnInit {

 public dataSource!: MatTableDataSource<User>;
 public users!: User[];

 
 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;

 displayedColumns: string[] =['id','firstName', 'lastName','email','mobile','bmiResult','gender','package','enquiryDate','action'];
  confirmService: any;
  apiService: any;
  toastService: any;

constructor(private api : ApiService , private toast:NgToastService, private confirm:NgConfirmService , private router: Router){

}
  ngOnInit(): void {
    this.getUsers();
  }

getUsers(){
  this.api.getRegisteredUser()
  .subscribe(res=>{
    this.users = res;
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort =this.sort;
  })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

edit(id:number){
this.router.navigate(['update',id]);
}

delete(id: number) {
  this.confirm.showConfirm("Are you sure want to Delete?",
    () => {
      this.api.deleteRegistered(id)
        .subscribe(res=> {
            this.toast.success({ detail: 'SUCCESS', summary: 'Deleted Successfully', duration: 3000 });
            this.getUsers();
          })
        },
      ()=>{

      })
    }
}