import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user';
import { UserService } from "../../services/user.service";

@Component({
    selector: 'sign-up',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignUpComponent implements OnInit {    
    private user: User;
    
    constructor( private userService: UserService, private router: Router) {
    }

    ngOnInit(): void {
      this.user = new User();
    }

    onSubmit(form): void {
        if (form.valid) {
            var model = this.user;
            this.userService.signup(model).then(res => {
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