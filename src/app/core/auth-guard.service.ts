import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public router: Router, public jwtHelper: JwtHelperService) {}

  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public canActivate() {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
