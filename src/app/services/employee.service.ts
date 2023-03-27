import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Employee } from '../Interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  

  private BASE_URL = environment.BASE_URL;
  

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.BASE_URL + "/api/Employees");
  }

  addEmlpoyee(empData: Employee) : Observable<Employee>{
    return this.http.post<Employee>(this.BASE_URL + "/api/Employees", empData);
  }

  editEmployee(empData: any, model: Employee) : Observable<Employee>{
    return this.http.put<Employee>(this.BASE_URL + `/api/Employees/${empData.id}`, model);
  }

  deleteEmloyee(id: string):Observable<Employee>{
    return this.http.delete<Employee>(this.BASE_URL + `/api/Employees/${id}`);
  }
}
