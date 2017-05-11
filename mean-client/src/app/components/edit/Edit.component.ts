import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EmployeeService } from "../../services/employee.service";
import { Employee } from '../../models/employee';

@Component({
    moduleId: module.id,
    selector: 'edit',
    templateUrl: 'edit.component.html',

})
export class editComponent implements OnInit {
    private employee: Employee;
    private pars: Params;

    public constructor(private empService: EmployeeService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.route.params
            .subscribe((params: Params) => this.pars = params);
        this.getEmployeeInfo();
    }

    getEmployeeInfo(): void {
        this.empService.getEmployeeById(this.pars['id'])
            .then(res => this.employee = res.data);
    }

    onSubmit(form): void {
        if (form.form.valid) {
            var model = this.employee;
            this.empService.updateEmployee(this.pars['id'], model)
                .then(res => {
                    if (res.success) {
                        alert('Success.');
                        this.router.navigate(['/home']);
                        //this.router.navigate(['/details'], { queryParams: { id: this.pars['id'] } });
                        //this.router.navigate(['edit', { id: this.pars['id'] }]);
                    } else {
                        alert(res.message);
                    }
                });
        } else {
            alert("Data invalid.");
        }
    }
}