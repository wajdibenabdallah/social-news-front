import { LoginService } from './login.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ALERT_TYPE, Alert } from 'src/app/shared/model/alert';
import { AlertService } from 'src/app/shared/component/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private alert: AlertService,
    private router: Router
  ) {}

  onSubmit() {
    this.service.login(this.form.value).subscribe(
      (data) => this.onSuccess(data),
      (error) => this.onError(error)
    );
  }

  onSuccess(data: any): void {
    localStorage.setItem('token', data.token);
    this.router.navigate(['profile']);
  }

  onError(error: any): void {
    let title: string;
    let message: string;

    switch (error.status) {
      case 401:
        title = 'Problème d\'authentifcation';
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
}
