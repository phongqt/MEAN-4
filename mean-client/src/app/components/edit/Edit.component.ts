import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EmployeeService } from "../../services/employee.service";
import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'edit',
    templateUrl: 'edit.component.html',

})
export class editComponent implements OnInit{
    employee = null;
    public constructor(private empService: EmployeeService, private route: ActivatedRoute) { }

    ngOnInit(): void {
    this.route.params
        .switchMap((params: Params) => this.empService.getEmployeeById(params['id']))
        .subscribe(hero => this.employee = hero);
    }
}   