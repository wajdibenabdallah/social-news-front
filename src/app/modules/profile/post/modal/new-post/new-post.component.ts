import { Component, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegEx } from 'src/app/shared/class/reg-ex/reg-ex.enum';
import { ErrorService } from 'src/app/shared/service/error/error.service';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent {
  private form = this.fb.group({
    title: ['', Validators.required],
    text: ['', [Validators.required, Validators.minLength(50)]],
    image: ['', Validators.pattern(RegEx.IS_VALID_IMAGE)],
  });

  errorFieldService: ErrorService;
  spinner: boolean;
  constructor(
    private fb: FormBuilder,
    private service: PostService,
    private newPostRef: MatDialogRef<NewPostComponent>,
    private container: ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    _errorFieldService: ErrorService,
  ) {
    newPostRef.disableClose = true;
    this.spinner = false;
    this.errorFieldService = _errorFieldService;
  }

  onSubmit(): void {
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
      (error) => console.error(error),
    );
  }

  refresh(): void {
    window.location.reload();
  }

  onCancel(): void {
    this.newPostRef.close();
  }

  get title() {
    return this.form.get('title') as FormControl;
  }

  get text() {
    return this.form.get('text') as FormControl;
  }
}
