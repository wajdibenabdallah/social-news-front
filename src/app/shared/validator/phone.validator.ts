import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    let isValid = true;
    if (control.value.length < 8) {
      isValid = false;
    }
    return {
      phone: isValid,
    };
  };
}
