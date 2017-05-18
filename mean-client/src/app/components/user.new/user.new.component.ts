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
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.createForm = fb.group({
            UserName: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)])],
            FirstName: [null, Validators.required],
            LastName: [null, Validators.required],
            Email: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            Address: '',
            Passwords: fb.group({
                Password: [null, Validators.required],
                PasswordConfirm: [null, Validators.required],
            }, { validator: this.matchingPasswords('Password', 'PasswordConfirm') })
        });


    }

    ngOnInit(): void {
        this.user = new User();
    }


    matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey];
            let passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({ notEquivalent: true })
            }
        }
    }

    onSubmit(form): void {
        if (form.valid) {
            var value = form.value;
            this.user.UserName = value.UserName;
            this.user.FirstName = value.FirstName;
            this.user.LastName = value.LastName;
            this.user.Password = value.Passwords.Password;
            this.user.Email = value.Email;
            this.user.Address = value.Address;
            
            this.userService.addUser(this.user).then(res => {
                if (res.success) {
                    alert('Success.');
                    this.router.navigate(['/dashboard/user-list']);
                } else {
                    alert(res.message);
                }
            });
        } else {
            alert('Data invalid.');
        }
    }
}