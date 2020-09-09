import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { phoneValidator } from 'src/app/shared/validator/phone.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(
        '',
        Validators.compose([Validators.required, phoneValidator()])
      ),
      password: new FormControl('', []),
      confirmPassword: new FormControl('', []),
    });
  }

  ngOnInit() {}

  onSubmit() {
    console.log(this.form.controls);
  }

  getFieldError(field: ValidationErrors): string {
    if (field.hasOwnProperty('required') && field.required) {
      return 'Ce champ est Obligatoire';
    }
    if (field.hasOwnProperty('minlength') && field.minlength) {
      return `Ce champ doit etre composé au moin de ${field.minlength.requiredLength} caracatères`;
    }
    if (field.hasOwnProperty('email') && field.email) {
      return `Email invalide`;
    }
    if (field.hasOwnProperty('phone') && field.phone) {
      return field.phone;
    }
  }

  get firstName() {
    return this.form.get('firstName') as FormControl;
  }

  get lastName() {
    return this.form.get('lastName') as FormControl;
  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  get phone() {
    return this.form.get('phone') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.form.get('confirmPassword') as FormControl;
  }
}
