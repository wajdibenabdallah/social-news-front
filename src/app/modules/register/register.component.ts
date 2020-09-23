import { AlertService } from 'src/app/shared/component/alert/alert.service';
import { Router } from '@angular/router';
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
import { Alert, ALERT_TYPE } from 'src/app/shared/model/alert';

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
        Validators.compose([Validators.required, phoneValidator]),
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validator: passwordValidator },
  );

  constructor(
    private fb: FormBuilder,
    private service: RegisterService,
    private router: Router,
    private alert: AlertService,
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.form.valid && (this.form.value as User)) {
      this.service.register(this.form.value).subscribe(
        (data) => {
          localStorage.setItem('token', data.token);
          this.router.navigate(['profile']);
        },
        (error) => {
          const alert: Alert = {
            title: `Erreur d'inscrpition`,
            message: `Email existe déja`,
            type: ALERT_TYPE.ERROR,
          };
          this.alert.newAlert(alert);
        },
      );
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
