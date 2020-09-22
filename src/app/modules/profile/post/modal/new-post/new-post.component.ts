import { Observable, Subscribable, Subscriber } from 'rxjs';
import { Component, ElementRef, Inject } from '@angular/core';
import { FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    image: ['', Validators.compose([
      Validators.required, 
      Validators.pattern(/^(.*\.(?!(jpg|png|jpeg)$))?[^.]*$/i)])
    ]
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

  getFieldError(field: ValidationErrors): void {
    console.log(field);
    /*
    if (field.hasOwnProperty('required') && field.required) {
      return 'Ce champ est Obligatoire';
    }
    if (field.hasOwnProperty('email') && field.email) {
      return `Email invalide`;
    }
    */
  }
}
