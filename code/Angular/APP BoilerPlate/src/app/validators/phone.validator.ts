import { AbstractControl, ValidatorFn } from '@angular/forms';
// import * as libphonenumber from 'google-libphonenumber';

export class PhoneValidator {
  static get validCountryPhone(): (countryControl: AbstractControl) => ValidatorFn {
    return this._validCountryPhone;
  }

  static set validCountryPhone(value: (countryControl: AbstractControl) => ValidatorFn) {
    this._validCountryPhone = value;
  }

  // Inspired on: https://github.com/yuyang041060120/ng2-validation/blob/master/src/equal-to/validator.ts
  private static _validCountryPhone = (countryControl: AbstractControl): ValidatorFn => {
    return '';
  }

}
