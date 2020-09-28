import { LoginService } from './login.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ALERT_TYPE, Alert } from 'src/app/shared/model/alert';
import { AlertService } from 'src/app/shared/component/alert/alert.service';
import { ErrorService } from 'src/app/shared/service/error/error.service';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }],
})
export class LoginComponent {
  private form = this.fb.group({
    email: new FormControl('', Validators.required),
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private alert: AlertService,
    private router: Router,
    public errorFieldService: ErrorService,
  ) {}

  onSubmit() {
    this.service.login(this.form.value).subscribe(
      (data: { token: string }) => this.onSuccess(data.token),
      (error) => this.onError(error),
    );
  }

  onSuccess(token: string): void {
    localStorage.setItem('token', token);
    this.router.navigate(['profile']);
  }

  onError(error: any): void {
    let title: string;
    let message: string;

    switch (error.status) {
      case 401:
        title = 'Problème d authentifcation';
        message = 'Vérifier votre email ou mot de passe';
        break;
      default:
        title = 'Problème de serveur';
        message = 'Impossible de connecter au serveur';
    }
    const alert: Alert = {
      title: title,
      message: message,
      type: ALERT_TYPE.ERROR,
    };
    this.alert.newAlert(alert);
  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }
}
