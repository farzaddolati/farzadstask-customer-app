import { Validator } from 'fluentvalidation-ts';
import { City } from '../models/city.model';

export class CityValidator extends Validator<City> {
  constructor() {
    super();

    this.ruleFor('name')
      .notEmpty()
      .withMessage('Please enter name');    
  }
}