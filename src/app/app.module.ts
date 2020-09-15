import { TokenInterceptorService } from './shared/service/token-interceptor.service';
import { AuthGuardService } from './core/guard/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { HomeComponent } from './modules/home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './modules/profile/profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { AlertComponent } from './shared/component/alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatInputModule,
  MatGridListModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatExpansionModule,
} from '@angular/material';
import { PhoneDirective } from './shared/directive/phone.directive';

const JWT_Module_Options: JwtModuleOptions = {
  config: {
    throwNoTokenError: false,
  },
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    AlertComponent,
    PhoneDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot(JWT_Module_Options),
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatExpansionModule,
  ],
  providers: [
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
