import { element } from 'protractor';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/shared/model/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: { data: Post };
  @ViewChild('text') text: ElementRef;
  @ViewChild('more') more: ElementRef;
  constructor() {}

  ngOnInit() {}

  moreInfo() {
    this.text.nativeElement.setAttribute('style', 'overflow-y: scroll;');
    this.more.nativeElement.setAttribute('style', 'display: none;');
  }
}
