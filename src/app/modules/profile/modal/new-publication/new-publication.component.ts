import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegEx } from 'src/app/shared/class/reg-ex/reg-ex.enum';
import { ErrorService } from 'src/app/shared/service/error/error.service';
import { PublicationService } from '../../publication/publication.service';

@Component({
  selector: 'app-new-publication',
  templateUrl: './new-publication.component.html',
  styleUrls: ['./new-publication.component.scss'],
})
export class NewPublicationComponent {
  private form = this.fb.group({
    title: ['', Validators.required],
    text: ['', [Validators.required, Validators.minLength(50)]],
    image: ['', Validators.pattern(RegEx.IS_VALID_IMAGE)],
  });

  errorFieldService: ErrorService;
  spinner: boolean;
  displayImage: any;

  constructor(
    private fb: FormBuilder,
    private service: PublicationService,
    private newPublicationRef: MatDialogRef<NewPublicationComponent>,
    private container: ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _errorFieldService: ErrorService,
  ) {
    newPublicationRef.disableClose = true;
    this.spinner = false;
    this.errorFieldService = _errorFieldService;
  }

  onSubmit(): void {
    this.spinner = true;
    this.container.nativeElement.children[0].classList.add('loading');
    const formDataPublication = new FormData();
    formDataPublication.append('title', this.form.value.title);
    formDataPublication.append('text', this.form.value.text);
    if (this.form.value.image?._files) {
      formDataPublication.append('publicationImage', this.form.value.image._files[0]);
    }
    this.service.post(formDataPublication).subscribe(
      () => {
        this.cancel();
        this.refresh();
      },
      (error) => {
        console.error(error);
        this.spinner = false;
      },
    );
  }

  refresh(): void {
    window.location.reload();
  }

  cancel(): void {
    this.newPublicationRef.close();
  }

  onUploadImage(): void {
    const reader = new FileReader();
    reader.readAsDataURL(this.form.value.image._files[0]);
    reader.onload = (loadEvent: any) => {
      this.displayImage = loadEvent.target.result;
    };
  }

  get title() {
    return this.form.get('title') as FormControl;
  }

  get text() {
    return this.form.get('text') as FormControl;
  }
}
