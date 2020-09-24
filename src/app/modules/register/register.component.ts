import { AlertService } from 'src/app/shared/component/alert/alert.service';
import { Router } from '@angular/router';
import { User } from './../../shared/model/user';
import { RegisterService } from './register.service';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { phoneValidator } from 'src/app/shared/validator/phone.validator';
import { passwordValidator } from 'src/app/shared/validator/password.validator';
import { Alert, ALERT_TYPE } from 'src/app/shared/model/alert';
import { RegEx } from 'src/app/shared/class/reg-ex/reg-ex.enum';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }],
})
export class RegisterComponent implements OnInit {
  private form: FormGroup = this.fb.group(
    {
      firstName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.pattern(RegEx.IS_EMAIL)]),
      phone: new FormControl('', Validators.compose([Validators.required, phoneValidator()])),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validator: passwordValidator },
  );

  // matcher = new ErrorStateMatcher();

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

  getFieldError(field: ValidationErrors): string | null {
    if (field && field.hasOwnProperty('required') && field.required) {
      return 'Ce champ est Obligatoire';
    }
    if (field && field.hasOwnProperty('minlength') && field.minlength) {
      return `Ce champ doit etre composé au moin de ${field.minlength.requiredLength} caracatères`;
    }
    if (field && field.hasOwnProperty('maxlength') && field.maxlength) {
      return `Ce champ doit etre composé en max de ${field.maxlength.requiredLength} caracatères`;
    }
    if (field && field.hasOwnProperty('pattern') && field.pattern) {
      return `Email invalide`;
    }
    if (field && field.hasOwnProperty('matchPassword') && !field.matchPassword) {
      return `Les mots de passes ne sont pas identique`;
    }
    if (field && field.hasOwnProperty('phone') && field.phone) {
      return `Format incorrecte`;
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
