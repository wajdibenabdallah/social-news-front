import { Observable } from 'rxjs';
import { PostService } from './post/post.service';
import { AuthGuardService } from '../../core/guard/auth-guard.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/model/post';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(
    private authGuard: AuthGuardService,
    private postService: PostService
  ) {}

  ngOnInit() {
    // get all posts
    this.posts$ = this.postService.fetchAll();
  }

  public logout() {
    this.authGuard.logout();
  }
}
