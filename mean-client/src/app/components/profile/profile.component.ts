import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {
    private profile: object;

    constructor(private userService: UserService) {

    }

    ngOnInit(): void {
        this.getProfile();
    }

    getProfile() {
        this.userService.getProfile().then(res => {
            if (res.success) {
                this.profile = res.data;
            }
        });
    }
}