import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public router: Router, public jwtHelper: JwtHelperService) {}

  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
