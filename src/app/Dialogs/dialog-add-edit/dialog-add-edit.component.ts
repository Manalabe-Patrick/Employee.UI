import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar} from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';

import { ThisReceiver } from '@angular/compiler'; 
import { Employee } from 'src/app/Interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';

export const MY_DATE_FORMATS = {
  parse:{
    dataInput: 'MM/DD/YYYY',
  },
  display:{
    dataInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMMM YYYYY',
    dataA11yLabel: 'LL',
    monthYearA11Label: 'MMMM YYYYY',
  }
}

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class DialogAddEditComponent implements OnInit{
  formEmployee: FormGroup;
  action: string = "Add";
  actionButton:string = "Save";

  constructor(
    private dialogReference: MatDialogRef<DialogAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public employeeData: Employee,
    private fb:FormBuilder,
    private _snackbar: MatSnackBar,
    private _employeeService: EmployeeService

    ){
      this.formEmployee = this.fb.group({
        firstName: ["", Validators.required],
        middleName: ["", Validators.required],
        lastName: ["", Validators.required],
        dateOfBirth: ["", Validators.required],
        contact: [""],
        houseNumber: [""],
        street: [""],
        village: [""],
        barangay: [""],
        town: [""],
        city: [""],
        province: [""],
        zipCode: [""]
      })
    }

    ngOnInit(): void {
      if(this.employeeData){
        this.formEmployee.patchValue({
          firstName: this.employeeData.firstName,
          middleName: this.employeeData.middleName,
          lastName: this.employeeData.lastName,
          dateOfBirth: this.employeeData.dateOfBirth,
          contact: this.employeeData.contact,
          houseNumber: this.employeeData.houseNumber,
          street: this.employeeData.street,
          village: this.employeeData.village,
          barangay: this.employeeData.barangay,
          town: this.employeeData.town,
          city: this.employeeData.city,
          province: this.employeeData.province,
          zipCode: this.employeeData.zipCode
        });

        this.action = "Edit";
        this.actionButton = "Update";
      }

    }

    showAlert(msg:string, title:string){
      this._snackbar.open(msg, title),{
        horizontalPosition: "end",
        verticalPosition: "top",
        duration: 3000
      }
    }

    addEditEmployee() { 
      const model:Employee ={
        firstName: this.formEmployee.value.firstName,
        middleName: this.formEmployee.value.middleName,
        lastName: this.formEmployee.value.lastName,
        dateOfBirth: this.formEmployee.value.dateOfBirth,
        contact: this.formEmployee.value.contact | 0,
        houseNumber: this.formEmployee.value.houseNumber,
        street: this.formEmployee.value.street,
        village: this.formEmployee.value.village,
        barangay: this.formEmployee.value.barangay,
        town: this.formEmployee.value.town,
        city: this.formEmployee.value.city,
        province: this.formEmployee.value.province,
        zipCode: this.formEmployee.value.zipCode
      }


      if(this.employeeData == null){
        this._employeeService.addEmlpoyee(model).subscribe({
          next:(data) =>{
            if(data){
              this.showAlert("Employee added successfully", "success");
              this.dialogReference.close('created');
            }else{
              this.showAlert("could not add employee", "Error");
            }
           
          },
          error:(e) =>{
            console.log(e);
          }
        })
      }
      else{
        this._employeeService.editEmployee(this.employeeData, model).subscribe({
          next:(data) =>{
            if(data){
              this.showAlert("Employee updated successfully", "success");
              this.dialogReference.close('edited');
            }else{
              this.showAlert("could not update employee", "Error");
            }
           
          },
          error:(e) =>{
            console.log(e);
          }
        })
      }
    }
}
