import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  constructor() { }

  @ViewChild('alert') alert: ElementRef;

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }

}
