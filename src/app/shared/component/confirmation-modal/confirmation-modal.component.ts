import { UserSettingsComponent } from './../../../modules/profile/modal/user-settings/user-settings.component';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  onConfirmEvent = new EventEmitter();
  onCancelEvent = new EventEmitter();
  message: string;

  constructor(private dialogRef: MatDialogRef<ConfirmationModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.message = this.data.message;
  }

  onConfirm() {
    this.onConfirmEvent.emit();
  }

  onCancel() {
    this.onCancelEvent.emit();
    this.dialogRef.close();
  }
}
