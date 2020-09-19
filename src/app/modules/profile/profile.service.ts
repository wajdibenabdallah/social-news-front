import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/shared/config/server';
import { User } from 'src/app/shared/model/user';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getCurrentUser() {
    return this.http.get<User>(`${CONFIG.baseUrl}/api/me`);
  }
}
