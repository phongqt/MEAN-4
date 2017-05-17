import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {CookieProvider} from '../../providers/cookie.provider';

@Component({
    selector: 'header-menu',
    templateUrl: 'header.component.html'
})

export class HeaderComponent {
    constructor(private router: Router, private cookieProvider: CookieProvider) {
    }

    viewProfile() {
        this.router.navigate(['/dashboard/profile']);
    }

    logout() {
        this.cookieProvider.remove("token");
        this.router.navigate(['/login']);
    }
}