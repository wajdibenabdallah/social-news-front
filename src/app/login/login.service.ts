import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  login(value: User): void {
    this.http.post('http://localhost:4000/api/login', value).subscribe(
      (data) => this.onSuccess(data),
      (error) => this.onError(error));
  }

  onSuccess(data: any) {
    localStorage.setItem('token', data.token);
    this.router.navigate(['profile']);
  }

  onError(error: any) {
    
  }
}
