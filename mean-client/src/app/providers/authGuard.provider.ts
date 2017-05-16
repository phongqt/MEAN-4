import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { LocalStorageProvider } from '../providers/localStorage.provider';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private localStorageProvider: LocalStorageProvider) {}

  canActivate() {
    // If the user is not logged in we'll send them back to the home page
    if (!this.localStorageProvider.get("token")) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}