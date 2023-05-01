import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Validator } from 'fluentvalidation-ts';
import { AddCustomerComponent } from '../modules/customer/add-customer/add-customer.component';
import { Customer } from '../models/customer.model';

export class CustomerValidator extends Validator<Customer> {
  constructor() {
    super();

    this.ruleFor('firstName')
      .notEmpty()
      .withMessage('Please enter first name');

    this.ruleFor('lastName')
      .notEmpty()
      .withMessage('Please enter last name');

    this.ruleFor('email')
      .emailAddress()
      .withMessage('please enter a valid email address');
  }
}


// @Injectable({
//   providedIn: 'root'
// })
// export class AddCustomerValidatorService implements Validator<AddCustomerComponent> {
//   validate(value: AddCustomerComponent): ValidationErrors | null {
//     const errors: ValidationErrors = {};

//     if (!value.form.get('firstName')?.value) {
//       errors['firstName'] = 'Please enter a first name.';
//     }

//     if (!value.form.get('lastName')?.value) {
//       errors['lastName'] = 'Please enter a last name.';
//     }

//     if (!value.form.get('email')?.value) {
//       errors['email'] = 'Please enter an email address.';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.form.get('email')?.value)) {
//       errors['email'] = 'Please enter a valid email address.';
//     }

//     return Object.keys(errors).length > 0 ? errors : null;
//   }
// }