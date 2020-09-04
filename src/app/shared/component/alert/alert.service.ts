import { Alert } from './../../model/alert';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSource = new Subject<any>();

  constructor() {}

  getObservable(): Observable<any> {
    return this.alertSource.asObservable();
  }

  newAlert(alert: Alert) {
    this.alertSource.next(alert);
  }
}
