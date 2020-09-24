import { FormControl } from '@angular/forms';

export class ErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return control.dirty && control.invalid;
  }
}
