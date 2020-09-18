import { Observable } from 'rxjs';
import { PostService } from './post/post.service';
import { AuthGuardService } from '../../core/guard/auth-guard.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/model/post';
import { MatDialog } from '@angular/material';
import { NewPostComponent } from './post/modal/new-post/new-post.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(
    private authGuard: AuthGuardService,
    private postService: PostService,
    private newPostModal: MatDialog
  ) {}

  ngOnInit(): void {
    // get all posts
    this.posts$ = this.postService.fetchAll();
  }

  newPost(): void {
    const dialogRef = this.newPostModal.open(NewPostComponent, {
      width: '250px',
      data: { surname: 'wajdi', name: 'ben abdallah' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }

  logout(): void {
    this.authGuard.logout();
  }
}
