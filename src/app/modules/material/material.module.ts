import { NgModule } from '@angular/core';
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
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NGX_MAT_FILE_INPUT_CONFIG } from 'ngx-material-file-input';
import { AuthGuardService } from '../../core/guard/auth-guard.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../../shared/service/inspector/token-interceptor.service';

@NgModule({
  declarations: [],
  exports: [
    HttpClientModule,
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
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatDividerModule,
    MatDatepickerModule,
    MatSnackBarModule,
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
    MatDatepickerModule,
  ],
})
export class MaterialModule {}
