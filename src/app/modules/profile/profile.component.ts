import { ProfileService } from './profile.service';
import { Observable } from 'rxjs';
import { PostService } from './post/post.service';
import { AuthGuardService } from '../../core/guard/auth-guard.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/model/post';
import { MatDialog } from '@angular/material/dialog';
import { NewPostComponent } from './post/modal/new-post/new-post.component';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  posts$: Observable<Post[]>;
  user$: Observable<User>;

  constructor(
    private authGuard: AuthGuardService,
    private postService: PostService,
    private profileService: ProfileService,
    private newPostModal: MatDialog
  ) {}

  ngOnInit(): void {
    // get user informations
    this.user$ = this.profileService.getCurrentUser();
    // get all posts
    this.posts$ = this.postService.fetchAll();
  }

  newPost(): void {
    this.newPostModal.open(NewPostComponent, {
      width: '70%',
      height: '70%',
    });
  }

  logout(): void {
    this.authGuard.logout();
  }
}
