import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user';
import { UserService } from "../../services/user.service";
import { LocalStorageProvider } from "../../providers/localStorage.provider";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    private user: User;

    ngOnInit(): void {
        this.user = new User();
    }

    constructor(private userService: UserService, private router: Router, private localStorageProvider: LocalStorageProvider) {
    }

    onSubmit(form): void {
        if (form.valid) {
            var model = this.user;
            this.userService.login(model).then(res => {
                if (res.success) {
                    this.localStorageProvider.remove("token");
                    this.localStorageProvider.set("token", res.data);
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