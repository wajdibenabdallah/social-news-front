import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/home/login/login.component';
import { RegisterComponent } from './modules/home/register/register.component';
import { HomeComponent } from './modules/home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './modules/profile/profile.component';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { AlertComponent } from './shared/component/alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';


import { PublicationComponent } from './modules/profile/publication/publication.component';
import { NewPublicationComponent } from './modules/profile/modal/new-publication/new-publication.component';
import { UserPanelComponent } from './modules/profile/user-panel/user-panel.component';
import { UserSettingsComponent } from './modules/profile/modal/user-settings/user-settings.component';
import { MaterialModule } from './modules/material/material.module';

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
    PublicationComponent,
    NewPublicationComponent,
    UserPanelComponent,
    UserSettingsComponent,
  ],
  entryComponents: [NewPublicationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    JwtModule.forRoot(JWT_Module_Options),
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
