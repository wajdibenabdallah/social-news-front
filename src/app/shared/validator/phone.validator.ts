import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    console.log(control.value);
    return {
      phone: 'Error with phone',
    };
  };
}
