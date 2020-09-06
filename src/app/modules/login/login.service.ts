import { Alert } from './../../shared/model/alert';
import { AlertService } from '../../shared/component/alert/alert.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../shared/model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private _alertService: AlertService
  ) {}

  login(value: User): Observable<any> {
    return this.http.post('http://localhost:4000/api/login', value);
  }
}
