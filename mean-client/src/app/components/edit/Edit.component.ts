import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EmployeeService } from "../../services/employee.service";
import { Employee } from '../../models/employee';
import { detailsComponent } from '../details/details.component';

@Component({
    moduleId: module.id,
    selector: 'edit',
    templateUrl: 'edit.component.html',

})
export class editComponent implements OnInit{
    private employee:Employee;
    private pars: Params;
    
    public constructor(private empService: EmployeeService, private route: ActivatedRoute) { 
    }

    ngOnInit(): void {
        this.route.params
            .subscribe((params: Params) => this.pars = params['id']); 
        this.getEmployeeInfo();      
    }

    getEmployeeInfo(): void {
        this.empService.getEmployeeById(this.pars)
         .then(employee => this.employee = employee);
    }
}