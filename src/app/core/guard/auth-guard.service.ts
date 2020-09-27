import { delay } from 'rxjs/operators';
import { ProfileService } from './../../modules/profile/profile.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Alert, ALERT_TYPE } from 'src/app/shared/model/alert';
import { AlertService } from 'src/app/shared/component/alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private profileService: ProfileService,
    private alert: AlertService,
  ) {}

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
    this.profileService
      .logout()
      .pipe(delay(1000))
      .subscribe((response: { message: string }) => {
        const alert: Alert = {
          title: 'Logout',
          message: response.message,
          type: ALERT_TYPE.INFORMATION,
        };
        this.alert.newAlert(alert);
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      });
  }
}
