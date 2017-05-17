import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { CookieProvider } from '../providers/cookie.provider';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieProvider: CookieProvider) {}

  canActivate() {
    // If the user is not logged in we'll send them back to the home page
    if (!this.cookieProvider.get("token")) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}