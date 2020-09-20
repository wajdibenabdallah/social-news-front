import { Post } from './../../../shared/model/post';
import { CONFIG } from './../../../shared/config/server';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  fetchAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${CONFIG.baseUrl}/api/post`);
  }

  post(post: FormData): Observable<Post> {
    return this.http.post<Post>(`${CONFIG.baseUrl}/api/post`, post);
  }
}
