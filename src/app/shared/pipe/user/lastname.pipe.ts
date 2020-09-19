import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastname'
})
export class LastnamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
