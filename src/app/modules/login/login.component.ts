import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  constructor(private fb: FormBuilder, private service: LoginService) {}

  onSubmit() {
    this.service.login(this.loginForm.value);
  }
}
