import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/model/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: { data: Post };

  constructor() {}

  ngOnInit() {}
}
