import { CONFIG } from '../../../shared/config/server';
import { User } from '../../../shared/model/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  public register(user: User): Observable<any> {
    return this.http.post(`${CONFIG.baseUrl}/api/register`, user);
  }
}
