import { ValidatorFn, FormGroup } from '@angular/forms';

export const passwordValidator: ValidatorFn = (control: FormGroup) => {
  if (control.controls.password.value !== control.controls.confirmPassword.value) {
      return {
          'passwordConfirmation': false
      };
  }
  return null;
};
