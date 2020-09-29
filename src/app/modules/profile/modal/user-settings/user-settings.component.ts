import { Observable } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/shared/model/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegEx } from 'src/app/shared/class/reg-ex/reg-ex.enum';
import { phoneValidator } from 'src/app/shared/validator/phone.validator';
import { passwordValidator } from 'src/app/shared/validator/password.validator';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent {
  private form: FormGroup = this.fb.group(
    {
      firstName: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
      lastName: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
      email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.pattern(RegEx.IS_EMAIL)]),
      phone: new FormControl(
        { value: '', disabled: true },
        Validators.compose([Validators.required, phoneValidator()]),
      ),
      password: new FormControl({ value: '', disabled: true }, [Validators.minLength(8)]),
      date: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl({ value: '', disabled: true }, [Validators.required]),
    },
    { validator: passwordValidator },
  );

  constructor(@Inject(MAT_DIALOG_DATA) public user$: Observable<User>, private fb: FormBuilder) {}

  enable() {
    alert('enabele');
  }
}
