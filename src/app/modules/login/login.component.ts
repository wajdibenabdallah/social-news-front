import { ErrorStateMatcher } from '../../shared/class/error-state/error-state-matcher';
import { LoginService } from './login.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ALERT_TYPE, Alert } from 'src/app/shared/model/alert';
import { AlertService } from 'src/app/shared/component/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private form = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: ['', Validators.required],
  });

  matcher = new ErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private alert: AlertService,
    private router: Router,
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

  getFieldError(field: ValidationErrors): string {
    if (field.hasOwnProperty('required') && field.required) {
      return 'Ce champ est Obligatoire';
    }
    if (field.hasOwnProperty('email') && field.email) {
      return `Email invalide`;
    }
  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }
}
