import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPhone]',
})
export class PhoneDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('keydown', ['$event']) onKeyOver(event: KeyboardEvent) {
    if (isNaN(parseInt(event.key, 10)) && event.code !== 'Backspace') {
      event.preventDefault();
    }
    this.format();
  }

  format() {
    let formatedValue = this.elementRef.nativeElement.value;
    if (!formatedValue.startsWith('+')) {
      formatedValue = '+' + formatedValue;
    }
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'value',
      formatedValue,
    );
  }
}
