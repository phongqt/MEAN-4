import { EmployeeService } from "../../services/employee.service";
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { detailsComponent } from '../details/details.component';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html',

})
export class homeComponent implements OnInit {
    public EmployeeList = [];
    public EmployeeSelected = null;

    ngOnInit(): void {
        this.empService.getEmployeeList()
            //.subscribe((data: Response)=>this.EmployeeList = data.json());
            .subscribe(function (data: Response) {
                this.EmployeeList = data.json()
            }.bind(this));
    }
    public constructor(private empService: EmployeeService) {

    }

    public onSelectEmployee(employee) {
        this.EmployeeSelected = employee;
        console.log(employee);
    }
}   