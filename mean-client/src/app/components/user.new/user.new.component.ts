import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../models/user';
import { UserService } from "../../services/user.service";

@Component({
    selector: 'new-user',
    templateUrl: 'user.new.component.html'
})

export class NewUserComponent implements OnInit {
    private user: User;
    private createForm: FormGroup;

    constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
        this.createForm = fb.group({
            UserName: [null,Validators.required],
            Password: [null,  Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
            FistName: [null, Validators.required],
            LastName: [null, Validators.required]
        })
    }

    ngOnInit(): void {
        this.user = new User();
    }

    onSubmit(form): void {
        if (form.valid) {
            var model = this.user;
            this.userService.addUser(model).then(res => {
                if (res.success) {
                    alert('Success.');
                    this.router.navigate(['/']);
                } else {
                    alert(res.message);
                }
            });
        } else {
            alert('Data invalid.');
        }
    }
}