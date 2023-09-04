import { NgModule } from '@angular/core';

import { PhoneDirective } from './directive/phone.directive';
import { FirstnamePipe } from './pipe/user/firstname.pipe';
import { LastnamePipe } from './pipe/user/lastname.pipe';
import { ImageUriPipe } from './pipe/publication/image-uri.pipe';
import { HighlightPipe } from './pipe/search/highlight.pipe';
import { ConfirmationModalComponent } from './component/confirmation-modal/confirmation-modal.component';
import { FooterComponent } from './component/footer/footer/footer.component';
import { MaterialModule } from '../modules/material/material.module';

@NgModule({
  declarations: [
    ImageUriPipe,
    PhoneDirective,
    FirstnamePipe,
    LastnamePipe,
    ConfirmationModalComponent,
    FooterComponent,
    HighlightPipe,
  ],
  imports: [MaterialModule],
  exports: [FooterComponent, ImageUriPipe],
})
export class SharedModule {}
