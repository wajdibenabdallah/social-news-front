import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from './../../core/user/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<User> {
  constructor(private service: UserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.service.validEmail(route.queryParams.token).subscribe((data) => {
      this.router.navigate(['profile']);
    });
  }
}
