import { UserSettingsComponent } from '../modal/user-settings/user-settings.component';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthGuardService } from 'src/app/core/guard/auth-guard.service';
import { User } from 'src/app/shared/model/user';
import { UserService } from 'src/app/core/user/user.service';
import { Alert, ALERT_TYPE } from 'src/app/shared/model/alert';
import { AlertService } from 'src/app/shared/component/alert/alert.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit {
  @Input() user$: Observable<User>;
  @Output() updateUserEvent = new EventEmitter();

  bio: string;
  userId: string;

  private editMode = {
    bio: false,
  };
  constructor(
    private authGuard: AuthGuardService,
    private settingsModal: MatDialog,
    private userService: UserService,
    private alert: AlertService,
  ) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.userId = user.id;
      this.bio = user.bio;
    });
  }

  settings(): void {
    this.settingsModal
      .open(UserSettingsComponent, {
        width: '600px',
        height: '500px',
        data: this.user$,
        disableClose: true,
      })
      .componentInstance.updateUserEvent.subscribe((user: User) => {
        this.updateUserEvent.emit(user);
      });
  }

  editBio(): void {
    this.toggleEditBio();
  }

  updateBio(): void {
    this.userService.update(this.userId, { bio: this.bio }).subscribe(() => {
      const alert: Alert = {
        title: 'Success',
        message: 'Bio was updated',
        type: ALERT_TYPE.SUCCESS,
      };
      this.alert.newAlert(alert);
    });
    this.toggleEditBio();
  }

  cancelBio(): void {
    this.toggleEditBio();
  }

  toggleEditBio(): void {
    this.editMode.bio = !this.editMode.bio;
  }

  logout(): void {
    this.authGuard.logout();
  }
}
