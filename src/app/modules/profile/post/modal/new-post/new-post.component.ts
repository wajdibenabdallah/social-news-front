import { Observable, Subscribable, Subscriber } from 'rxjs';
import { Component, ElementRef, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent {
  private form = this.fb.group({
    title: ['', Validators.required],
    text: ['', Validators.required],
    image: ['', Validators.required],
  });

  spinner: boolean;
  constructor(
    private fb: FormBuilder,
    private service: PostService,
    public newPostRef: MatDialogRef<NewPostComponent>,
    public container: ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    newPostRef.disableClose = true;
    this.spinner = false;
  }

  onSubmit(): void {
    console.log(this.form.value);
    this.spinner = true;
    this.container.nativeElement.children[0].classList.add('loading');
    const formDataPost = new FormData();
    formDataPost.append('title', this.form.value.title);
    formDataPost.append('text', this.form.value.text);
    formDataPost.append('image', this.form.value.image._files[0]);
    this.service.post(formDataPost).subscribe(
      () => {
        this.onCancel();
        this.refresh();
      },
      (error) => console.error(error)
    );
  }

  refresh(): void {
    window.location.reload();
  }

  onCancel(): void {
    this.newPostRef.close();
  }
}
