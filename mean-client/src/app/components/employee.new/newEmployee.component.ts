import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../services/employee.service";
import { Employee } from '../../models/employee';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'newEmployee',
    templateUrl: 'newEmployee.component.html',

})
export class NewEmployeeComponent implements OnInit {
    private employee: Employee;

    public constructor(private empService: EmployeeService, private router: Router) {

    }

    ngOnInit(): void {
        this.employee = new Employee();
    }

    onSubmit(form): void {
        if (form.form.valid) {
            var model = this.employee;
            this.empService.addEmployee(model)
                .then(res => {
                    if (res.success) {
                        alert('Success.');
                        this.router.navigate(['/home']);
                    } else {
                        alert(res.message);
                    }
                });
        } else {
            alert("Data invalid.");
        }
    }
}   