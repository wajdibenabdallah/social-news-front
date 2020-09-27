import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthGuardService } from 'src/app/core/guard/auth-guard.service';
import { User } from 'src/app/shared/model/user';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit {
  user$: Observable<User>;

  constructor(private profileService: ProfileService, private authGuard: AuthGuardService) {}

  ngOnInit(): void {
    // get user informations
    this.user$ = this.profileService.getCurrentUser();
  }

  settings() {}

  logout(): void {
    this.authGuard.logout();
  }
}
