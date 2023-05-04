import { Validator } from 'fluentvalidation-ts';
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