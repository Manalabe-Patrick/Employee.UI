import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from './Interfaces/employee';
import { EmployeeService } from './services/employee.service';
import { DialogAddEditComponent } from './Dialogs/dialog-add-edit/dialog-add-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'Employee.UI';

  displayedColumns:string[] = ['FirstName', 'MiddleName', 'LastName', 'DOB', 'Contact', 'Action'
];
  dataEmployee = new MatTableDataSource<Employee>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _snackbar:MatSnackBar, private _employeeService: EmployeeService, private dialog: MatDialog){
  }

  showEmployees(){
    this._employeeService.getEmployees().subscribe({
      next:(data:any) =>{
        this.dataEmployee.data = data;
      },
      error: (e) =>{}
    })
  }

  deleteEmlpoyee(id:string){
    this._employeeService.deleteEmloyee(id).subscribe({
      next:(data:any) =>{
        this.showEmployees();
        this.showAlert("Employee deleted successfully", "success");
      },
      error: (e) =>{}
    })
  }

  ngOnInit(): void {
    this.showEmployees();
  }

  ngAfterViewInit(): void {
    this.dataEmployee.paginator = this.paginator;
  }

  addNewEmployee(){
    this.dialog.open(DialogAddEditComponent,{
      disableClose: true,
      width: "30%"
    }).afterClosed().subscribe(result =>{
      if(result === "created"){
        this.showEmployees();
      }else{
        if(result === "edited"){
          this.showEmployees();
        }
      }
   
    })
  }

  editEmployee(empData: Employee){
    this.dialog.open(DialogAddEditComponent,{
      disableClose: true,
      data:empData,
      width: "30%"
    }).afterClosed().subscribe(result =>{
      if(result === "edited"){
        this.showEmployees();
      }
   
    })
  }

  showAlert(msg:string, title:string){
    this._snackbar.open(msg, title),{
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    }
  }

  

}
