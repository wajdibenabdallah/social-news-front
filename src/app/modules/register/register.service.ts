import { User } from './../../shared/model/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  public register(user: User): Observable<any> {
    return this.http.post('http://localhost:4000/api/register', user);
  }
}
