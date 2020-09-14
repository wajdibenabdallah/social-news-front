import { ValidatorFn, FormGroup } from '@angular/forms';

export const passwordValidator: ValidatorFn = (form: FormGroup) => {
  if (
    form.controls.password.value !== form.controls.confirmPassword.value &&
    form.controls.confirmPassword.valid &&
    form.controls.password.valid
  ) {
    const error = {
      matchPassword: false,
    };
    form.controls.confirmPassword.setErrors(error);
    return error;
  }
  return null;
};
