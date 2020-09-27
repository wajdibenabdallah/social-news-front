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
import { ErrorService } from 'src/app/shared/service/error/error.service';

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

  constructor(
    private fb: FormBuilder,
    private service: RegisterService,
    private router: Router,
    private alert: AlertService,
    public errorFieldService: ErrorService,
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
