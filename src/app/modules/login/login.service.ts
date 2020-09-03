import { AlertService } from '../../shared/component/alert/alert.service';
import { AlertComponent } from '../../shared/component/alert/alert.component';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/model/user';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private router: Router, 
    private _alertService: AlertService
  ) {}

  login(value: User): void {
    this.http.post('http://localhost:4000/api/login', value).subscribe(
      (data) => this.onSuccess(data),
      (error) => this.onError(error)
    );
  }

  onSuccess(data: any): void {
    localStorage.setItem('token', data.token);
    this.router.navigate(['profile']);
  }

  onError(error: any) {
    this._alertService.newAlert('baddd');
  }
}
