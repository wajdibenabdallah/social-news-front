import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { RegEx } from '../class/reg-ex/reg-ex.enum';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    if (!new RegExp(RegEx.IS_PHONE_NUMBER).test(control.value)) {
      return {
        phone: true,
      };
    } else {
      return null;
    }
  };
}
