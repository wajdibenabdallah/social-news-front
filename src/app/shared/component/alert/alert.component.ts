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

  ngOnInit() {
    this.service.getObservable().subscribe((alert) => {
      this.alert.nativeElement.classList.add('show');
    });
  }

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }
}
