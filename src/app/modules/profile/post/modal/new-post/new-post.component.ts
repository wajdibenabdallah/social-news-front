import { Observable, Subscribable, Subscriber } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PostService } from '../../post.service';
import { nextContext } from '@angular/core/src/render3';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
})
export class NewPostComponent {
  private form = this.fb.group({
    title: ['', Validators.required],
    text: ['', Validators.required],
    image: [''],
  });
  constructor(
    private fb: FormBuilder,
    private service: PostService,
    public newPostRef: MatDialogRef<NewPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    newPostRef.disableClose = true;
  }

  onSubmit(): void {
    this.convertImageToBase64(this.form.value.image.files[0]).subscribe(
      (image64) => {
        this.service
          .post({
            ...this.form.value,
            image: image64,
          })
          .subscribe(() => {
            this.onCancel();
          });
      }
    );
  }

  convertImageToBase64(file: File): Observable<string | ArrayBuffer | null> {
    return new Observable(
      (observer: Subscriber<string | ArrayBuffer | null>) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          observer.next(reader.result);
          observer.complete();
        };
      }
    );
  }

  onCancel(): void {
    this.newPostRef.close();
  }
}
