import { CONFIG } from './../../shared/config/server';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(value: User): Observable<any> {
    return this.http.post(`${CONFIG.baseUrl}/api/login`, value);
  }
}
