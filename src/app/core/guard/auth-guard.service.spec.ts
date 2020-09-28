import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthGuardService } from './auth-guard.service';

const JWT_Module_Options: JwtModuleOptions = {
  config: {
    throwNoTokenError: false,
  },
};

describe('AuthGuardService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule, AppRoutingModule, JwtModule.forRoot(JWT_Module_Options)],
    }),
  );

  it('should be created', () => {
    const service: AuthGuardService = TestBed.inject(AuthGuardService);
    expect(service).toBeTruthy();
  });
});
