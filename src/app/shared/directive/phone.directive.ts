import { Directive, HostListener, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appPhone]',
})
export class PhoneDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.format();
  }

  @HostListener('keydown', ['$event']) onKeyOver(event: KeyboardEvent) {
    if (isNaN(parseInt(event.key, 10)) && !['Backspace', 'Tab'].includes(event.code)) {
      event.preventDefault();
    }
    this.format();
  }

  format() {
    let formatedValue = this.elementRef.nativeElement.value;
    if (!formatedValue.startsWith('+')) {
      formatedValue = '+' + formatedValue;
    }
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', formatedValue);
  }
}
