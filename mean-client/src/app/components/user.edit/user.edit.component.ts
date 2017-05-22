import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../models/user';
import { UserService } from "../../services/user.service";
import { FileUploadService } from "../../services/fileupload.service";

@Component({
    selector: 'edit-user',
    templateUrl: 'user.edit.component.html'
})

export class EditUserComponent implements OnInit {
    private user: User;
    private editForm: FormGroup;
    private pars: Params;
    private file: File;

    constructor(private userService: UserService, private route: ActivatedRoute, private fileUploadService: FileUploadService,
        private router: Router, private fb: FormBuilder) {
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.editForm = fb.group({
            UserName: '',
            FirstName: [null, Validators.required],
            LastName: [null, Validators.required],
            Email: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            Address: '',
            Avatar: null
        });

        this.route.params
            .subscribe((params: Params) => this.pars = params);
        this.getUserInfo();
    }

    ngOnInit(): void {
        this.user = new User();
    }

    getUserInfo() {
        this.userService.getUserInfo(this.pars['id'])
            .then(res => {
                if (res.success) {
                    this.user = res.data
                    this.editForm.setValue({
                        UserName: this.user.UserName,
                        FirstName: this.user.FirstName,
                        LastName: this.user.LastName,
                        Email: this.user.Email,
                        Address: this.user.Address,
                        Avatar: null
                    });
                }
            });
    }

    onChangeAvatar(event) {
        this.file = event.srcElement.files;
    }

    onSubmit(form): void {
        if (form.valid) {
            let file: File = this.file[0];
            let formData: FormData = new FormData();
            formData.append('file', file, file.name);
            this.fileUploadService.uploadAvatar(formData).then(res => {
                if (res.success) {
                    let value = form.value;
                    this.user.FirstName = value.FirstName;
                    this.user.LastName = value.LastName;
                    this.user.Address = value.Address;
                    this.user.Avatar = res.data;
                    this.userService.updateUser(this.pars['id'], this.user).then(res => {
                        if (res.success) {
                            alert('Success.');
                            this.router.navigate(['/dashboard/user-list']);
                        } else {
                            alert(res.message);
                        }
                    });
                }
            });

        } else {
            alert('Data invalid.');
        }
    }
}