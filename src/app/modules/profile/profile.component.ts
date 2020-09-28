import { ProfileService } from './profile.service';
import { from, Observable } from 'rxjs';
import { PostService } from './post/post.service';
import { AuthGuardService } from '../../core/guard/auth-guard.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/model/post';
import { MatDialog } from '@angular/material/dialog';
import { NewPostComponent } from './modal/new-post/new-post.component';
import { User } from 'src/app/shared/model/user';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, switchMap, tap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  posts$: Observable<Post[]>;
  searchPosts$: Observable<Post[]>;
  searchField: FormControl = new FormControl();
  searchForm = this.fb.group({ searchField: this.searchField });
  progress = false;

  constructor(private postService: PostService, private newPostModal: MatDialog, private fb: FormBuilder) {}

  ngOnInit(): void {
    // get all posts
    this.posts$ = this.postService.fetch();
    // search
    this.searchPosts$ = this.searchField.valueChanges.pipe(
      tap(() => (this.progress = true)),
      debounceTime(1000),
      tap(() => (this.progress = false)),
      mergeMap((value: string) => {
        if (value !== '') {
          return this.postService.fetch({ title: value });
        } else {
          return from([]);
        }
      }),
    );
  }

  newPost(): void {
    this.newPostModal.open(NewPostComponent, {
      width: '70%',
      height: '70%',
    });
  }
}
