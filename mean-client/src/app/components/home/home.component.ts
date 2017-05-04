import {EmployeeService} from "../../services/employee.service";  
import { Component } from '@angular/core';  
import { Response } from '@angular/http';  
import { detailsComponent } from '../details/details.component';

@Component({  
    moduleId: module.id,  
    selector: 'home',  
    templateUrl: 'home.component.html',  
      
})  
export class homeComponent {  
    public EmployeeList = [];  
    public EmployeeSelected = null;
    public constructor(private empService: EmployeeService) {  
        this.empService.getEmployeeList()  
            .subscribe(  
            (data: Response) => (this.EmployeeList = data.json())  
            );    
    }

    public onSelectEmployee(employee)  {
        this.EmployeeSelected = employee;
        console.log(employee);
    }
}   