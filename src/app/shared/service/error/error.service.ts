import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  getFieldError(field: ValidationErrors): string | null {
    console.log(field);
    if (field && field.hasOwnProperty('required') && field.required) {
      return 'Ce champ est Obligatoire';
    }
    if (field && field.hasOwnProperty('minlength') && field.minlength) {
      return `Ce champ doit etre composé au moin de ${field.minlength.requiredLength} caracatères`;
    }
    if (field && field.hasOwnProperty('maxlength') && field.maxlength) {
      return `Ce champ doit etre composé en max de ${field.maxlength.requiredLength} caracatères`;
    }
    if (field && field.hasOwnProperty('pattern') && field.pattern) {
      return `Email invalide`;
    }
    if (field && field.hasOwnProperty('matchPassword') && !field.matchPassword) {
      return `Les mots de passes ne sont pas identique`;
    }
    if (field && field.hasOwnProperty('phone') && field.phone) {
      return `Format incorrecte`;
    }
  }
}
