import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/shared/config/server';
import { User } from 'src/app/shared/model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  findById(): Observable<User> {
    return this.http.get<User>(`${CONFIG.baseUrl}/api/me`);
  }

  update(id: string, user: User | any): Observable<User> {
    return this.http.put<User>(`${CONFIG.baseUrl}/api/user/${id}`, user);
  }

  checkEmail(): Observable<{ ResponseMetadata: { RequestId: String }; MessageId: String }> {
    return this.http.post<{ ResponseMetadata: { RequestId: String }; MessageId: String }>(
      `${CONFIG.baseUrl}/aws/send/`,
      {},
    );
  }

  validEmail(token: string): Observable<Boolean> {
    return this.http.get<Boolean>(`${CONFIG.baseUrl}/aws/verify/`, { params: { token: token } });
  }
}
