import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(value: User): Observable<any> {
    return this.http.post('http://localhost:4000/api/login', value);
  }
}
