import { ConfirmationModalComponent } from './../../../../shared/component/confirmation-modal/confirmation-modal.component';
import { UserService } from './../../../../core/user/user.service';
import { Observable } from 'rxjs';
import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/shared/model/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegEx } from 'src/app/shared/class/reg-ex/reg-ex.enum';
import { phoneValidator } from 'src/app/shared/validator/phone.validator';
import { ErrorService } from 'src/app/shared/service/error/error.service';
import { UserPanelComponent } from '../../user-panel/user-panel.component';
import { Alert, ALERT_TYPE } from 'src/app/shared/model/alert';
import { AlertService } from 'src/app/shared/component/alert/alert.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  private form: FormGroup = this.fb.group({
    firstname: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    lastname: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.pattern(RegEx.IS_EMAIL)]),
    phone: new FormControl({ value: '', disabled: true }, Validators.compose([Validators.required, phoneValidator()])),
    birthdate: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl({ value: '', disabled: true }, [Validators.required]),
  });

  private editMode = {
    firstname: false,
    lastname: false,
    email: false,
    phone: false,
    birthdate: false,
  };

  private initUser: User;

  confirmationModal: MatDialogRef<ConfirmationModalComponent, MatDialogConfig>;

  private userId: string;
  updateUserEvent = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public user$: Observable<User>,
    private dialogRef: MatDialogRef<UserPanelComponent>,
    private fb: FormBuilder,
    public errorFieldService: ErrorService,
    private userService: UserService,
    private confirmationModalDialog: MatDialog,
    private alert: AlertService,
  ) {}

  ngOnInit(): void {
    this.user$.subscribe((user: User) => {
      this.userId = user.id;
      this.initUser = user;
      this.form.controls['firstname'].setValue(user.firstname);
      this.form.controls['lastname'].setValue(user.lastname);
      this.form.controls['email'].setValue(user.email);
      this.form.controls['phone'].setValue(user.phone);
      this.form.controls['birthdate'].setValue(user.birthdate);
    });
  }

  toggleEnable(fieldName: string): void {
    if (this.form.get(fieldName).status === 'DISABLED') {
      this.form.get(fieldName).enable();
      this.editMode[fieldName] = true;
    } else {
      this.form.get(fieldName).disable();
      this.editMode[fieldName] = false;
    }
  }

  update(fieldName: string): void {
    if (this.form.get(fieldName).dirty && this.form.get(fieldName).value !== this.initUser[fieldName]) {
      this.confirmationModal = this.confirmationModalDialog.open(ConfirmationModalComponent, {
        width: '500px',
        height: '100px',
        disableClose: true,
        data: {
          message: `Do you want to save updating field ?`,
        },
      });
      this.confirmationModal.componentInstance.onConfirmEvent.subscribe(() => {
        this.userService.update(this.userId, this.form.value).subscribe(
          (user: User) => {
            this.initUser = user;
            this.toggleEnable(fieldName);
            this.updateUserEvent.emit();
            this.form.get(fieldName).markAsPristine();
          },
          (error) => {
            console.error(error);
          },
        );
      });
      this.confirmationModal.componentInstance.onCancelEvent.subscribe(() => {
        this.toggleEnable(fieldName);
      });
    } else {
      this.toggleEnable(fieldName);
    }
  }

  cancel(fieldName: string): void {
    if (this.form.get(fieldName).dirty && this.form.get(fieldName).value !== this.initUser[fieldName]) {
      this.confirmationModal = this.confirmationModalDialog.open(ConfirmationModalComponent, {
        width: '500px',
        height: '100px',
        disableClose: true,
        data: {
          message: `Do you want to cancel updating field ?`,
        },
      });
      this.confirmationModal.componentInstance.onConfirmEvent.subscribe(() => {
        this.form.get(fieldName).setValue(this.initUser[fieldName]);
        this.toggleEnable(fieldName);
      });
    } else {
      this.toggleEnable(fieldName);
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  checkEmail(): void {
    this.userService.checkEmail().subscribe(() => {
      const alert: Alert = {
        title: `Mail verification`,
        message: `Confirmation  has been sent, check your mail`,
        type: ALERT_TYPE.INFORMATION,
      };
      this.alert.newAlert(alert);
    });
  }

  get firstname() {
    return this.form.get('firstname') as FormControl;
  }
  get lastname() {
    return this.form.get('lastname') as FormControl;
  }
  get email() {
    return this.form.get('email') as FormControl;
  }
  get phone() {
    return this.form.get('phone') as FormControl;
  }
  get birthdate() {
    return this.form.get('birthdate') as FormControl;
  }
}
