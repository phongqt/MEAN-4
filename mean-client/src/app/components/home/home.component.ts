import {EmployeeService} from "../../services/employee.service";  
import { Component } from '@angular/core';  
import { Response } from '@angular/http';  
  
@Component({  
    moduleId: module.id,  
    selector: 'home',  
    templateUrl: 'home.component.html',  
      
})  
export class homeComponent {  
      public EmployeeList = [];  
    public constructor(private empService: EmployeeService) {  
        this.empService.getEmployeeList()  
            .subscribe(  
            (data: Response) => (this.EmployeeList = data.json())  
            );  
  
    }  
}   