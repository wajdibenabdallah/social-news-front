import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, args: string): unknown {
    const searchedSyntax = new RegExp(args, 'gi');
    return value.replace(searchedSyntax, '<strong>$&</strong>');
  }
}
