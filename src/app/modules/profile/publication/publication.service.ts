import { Publication } from '../../../shared/model/publication';
import { CONFIG } from '../../../shared/config/server';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PublicationService {
  constructor(private http: HttpClient) {}

  fetch(params?: any): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${CONFIG.baseUrl}/api/publication`, {
      params: params,
    });
  }

  post(publication: FormData): Observable<Publication> {
    return this.http.post<Publication>(`${CONFIG.baseUrl}/api/publication`, publication);
  }
}
