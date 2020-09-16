import { PostService } from './post/post.service';
import { AuthGuardService } from '../../core/guard/auth-guard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private authGuard: AuthGuardService,
    private postService: PostService
  ) {}

  ngOnInit() {
    // get all posts
    this.postService.fetchAll().subscribe(
      (posts) => {
        console.log(posts);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public logout() {
    this.authGuard.logout();
  }
}
