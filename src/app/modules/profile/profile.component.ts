import { AuthGuardService } from '../../core/guard/auth-guard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private authGuard: AuthGuardService) {}

  ngOnInit() {}

  public logout() {
    this.authGuard.logout();
  }
}
