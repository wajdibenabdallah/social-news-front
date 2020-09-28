import { TokenInterceptorService } from './shared/service/inspector/token-interceptor.service';
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

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { PhoneDirective } from './shared/directive/phone.directive';
import { PostComponent } from './modules/profile/post/post.component';
import { NewPostComponent } from './modules/profile/post/modal/new-post/new-post.component';
import { MaterialFileInputModule, NGX_MAT_FILE_INPUT_CONFIG } from 'ngx-material-file-input';
import { FirstnamePipe } from './shared/pipe/user/firstname.pipe';
import { LastnamePipe } from './shared/pipe/user/lastname.pipe';
import { ImageUriPipe } from './shared/pipe/post/image-uri.pipe';
import { HighlightPipe } from './shared/pipe/search/highlight.pipe';
import { UserPanelComponent } from './modules/profile/user-settings/user-settings/user-panel.component';

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
    PhoneDirective,
    PostComponent,
    NewPostComponent,
    FirstnamePipe,
    LastnamePipe,
    ImageUriPipe,
    HighlightPipe,
    UserPanelComponent,
  ],
  entryComponents: [NewPostComponent],
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
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    MaterialFileInputModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatProgressBarModule,
  ],
  providers: [
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: NGX_MAT_FILE_INPUT_CONFIG,
      useValue: {
        sizeUnit: 'Octet',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
