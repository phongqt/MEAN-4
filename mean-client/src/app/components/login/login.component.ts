import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user';
import { UserService } from "../../services/user.service";
import { CookieProvider } from '../../providers/cookie.provider';

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

    constructor(private userService: UserService, private router: Router, private cookieProvider: CookieProvider) {
    }

    onSubmit(form): void {
        if (form.valid) {
            var model = this.user;
            this.userService.login(model).then(res => {
                if (res.success) {
                    this.cookieProvider.remove("token");
                    this.cookieProvider.set("token", res.data, 1);
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