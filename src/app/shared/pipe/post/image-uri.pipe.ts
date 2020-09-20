import { CONFIG } from './../../config/server';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUri',
})
export class ImageUriPipe implements PipeTransform {
  transform(uri: any): string {
    if (!uri) {
      return '/assets/images/image_not_found.png';
    }
    return `${CONFIG.baseUrl}/${uri}`;
  }
}
