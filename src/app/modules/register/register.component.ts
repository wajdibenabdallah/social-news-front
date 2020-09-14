import { User } from './../../shared/model/user';
import { RegisterService } from './register.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { phoneValidator } from 'src/app/shared/validator/phone.validator';
import { passwordValidator } from 'src/app/shared/validator/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private form: FormGroup = this.fb.group(
    {
      firstName: new FormControl('Wajdi', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
      lastName: new FormControl('Ben Abdallah', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
      email: new FormControl('wajdibabdallah@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl(
        '+33 6 11 76 29 07',
        Validators.compose([Validators.required, phoneValidator])
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validator: passwordValidator }
  );

  constructor(private fb: FormBuilder, private service: RegisterService) {}

  ngOnInit() {}

  onSubmit() {
    if (this.form.valid && (this.form.value as User)) {
      this.service.register(this.form.value).subscribe(data => console.log(data));
    }
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
