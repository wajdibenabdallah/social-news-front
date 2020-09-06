import { LoginService } from "./login.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { Alert } from "src/app/shared/model/alert";
import { AlertService } from "src/app/shared/component/alert/alert.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: [""],
    password: [""],
  });

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private _alertService: AlertService,
    private router: Router
  ) {}

  onSubmit() {
    this.service.login(this.loginForm.value).subscribe(
      (data) => this.onSuccess(data),
      (error) => this.onError(error)
    );
  }

  onSuccess(data: any): void {
    localStorage.setItem("token", data.token);
    this.router.navigate(["profile"]);
  }

  onError(error: string): void {
    const alert: Alert = {
      title: error || "Test",
      message: error,
    };
    this._alertService.newAlert(alert);
  }
}
