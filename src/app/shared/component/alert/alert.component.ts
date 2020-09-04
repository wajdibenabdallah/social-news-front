import { Alert } from './../../model/alert';
import { AlertService } from './alert.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  constructor(private service: AlertService) {}

  @ViewChild('alert') alert: ElementRef;
  @ViewChild('title') title: ElementRef;
  @ViewChild('message') message: ElementRef;

  ngOnInit() {
    this.service.getObservable().subscribe((alert: Alert) => {
      this.alert.nativeElement.classList.add('show');
      this.title.nativeElement.innerHTML = alert.title;
      this.message.nativeElement.innerHTML = alert.message;
    });
  }

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }
}
