import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertSource = new Subject<any>();

  constructor() { }

  getObservable(): Observable<any> {
    return this.alertSource.asObservable();
  }

  newAlert(message: string) {
    this.alertSource.next(message);
  }
}
