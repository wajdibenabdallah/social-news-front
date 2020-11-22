import { element } from 'protractor';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Publication } from 'src/app/shared/model/publication';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss'],
})
export class PublicationComponent implements OnInit {
  @Input() publication: { data: Publication };
  @ViewChild('text') text: ElementRef;
  @ViewChild('more') more: ElementRef;
  constructor() {}

  ngOnInit() {}

  moreInfo() {
    this.text.nativeElement.setAttribute('style', 'overflow-y: scroll;');
    this.more.nativeElement.setAttribute('style', 'display: none;');
  }
}
