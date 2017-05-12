import { EmployeeService } from "../../services/employee.service";
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { detailsComponent } from '../employee.details/details.component';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html',

})
export class homeComponent implements OnInit {

    currentPage = 1;
    totalPage = 0;
    limit = 10;

    EmployeeList = [];
    EmployeeSelected = null;

    ngOnInit(): void {
        this.getList();
    }
    public constructor(private empService: EmployeeService) {
    }

    private getList() {
        this.empService.getEmployeeList(this.currentPage, this.limit)
            .then(res => {
                if (res.success) {
                    this.EmployeeList = res.data.data;
                    this.totalPage = res.data.totalItems;
                }
            });
        // .subscribe(function (data: Response) {
        //     this.EmployeeList = data.json()
        // }.bind(this));
    }

    public onSelectEmployee(employee) {
        this.EmployeeSelected = employee;
        console.log(employee);
    }

    public deleteEmployee(item) {
        var result = confirm("Want to delete?");
        if (result) {
            this.empService.deleteEmployee(item._id)
                .then(res => {
                    if (res.success) {
                        this.getList();
                    }
                });
        }
    }

    public pageChange() {
       this.getList();
    }
}   