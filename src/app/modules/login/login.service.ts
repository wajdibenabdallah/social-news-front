import { Alert } from './../../shared/model/alert';
import { AlertService } from '../../shared/component/alert/alert.service';
import { AlertComponent } from '../../shared/component/alert/alert.component';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../shared/model/user';
import { Alert } from '../../shared/model/alert';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private _alertService: AlertService
  ) {}

  login(value: User): any {
    return this.http.post('http://localhost:4000/api/login', value).subscribe(
      (data) => this.onSuccess(data),
      (error) => this.onError(error)
    );
  }

  onSuccess(data: any): void {
    localStorage.setItem('token', data.token);
    this.router.navigate(['profile']);
  }

  onError(error: HttpErrorResponse): void {
    console.log(error);
    const alert: Alert = {
      title: error.error.info.message || 'Test',
      message: error.error.info.message,
    };
    this._alertService.newAlert(alert);
  }
}
