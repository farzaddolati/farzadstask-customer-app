import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { RouterModule, Routes } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerValidator } from 'src/app/services/customer-validator.service';
import { ValidationErrors } from 'fluentvalidation-ts/dist/ValidationErrors';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });
  // form: FormGroup = new FormGroup({});
  customer: Customer = { id: 0, firstName: '', lastName: '', email: '' };
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const customerId = params['id'];
      this.customerService.getCustomerById(customerId).subscribe(customer => {
        this.customer = customer;
        this.form = this.formBuilder.group({
          firstName: [customer.firstName, Validators.required],
          lastName: [customer.lastName, Validators.required],
          email: [customer.email, [Validators.required, Validators.email]]
        });
        
      });
    });
  }

  validator:CustomerValidator = new CustomerValidator();
  validationResult: ValidationErrors<Customer> = {};
  //a:CustomerValidator;
  onSubmit(): void {
    const customer: Customer = {
      id: this.customer.id,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email
    };
  
    this.validationResult = this.validator.validate(customer);
    if (Object.keys(this.validationResult).length <= 0) {
      this.customerService.updateCustomer(customer).subscribe(() => {
        this.form.reset();
      });
      this.router.navigate(['/customers'], { relativeTo: this.route });
      this._snackBar.open('Customer updated successfully!', 'Info', {
        duration: 2000 
      });
    }
    else {
      this._snackBar.open('Please Solve Error Messages!', 'Dismiss', {
        duration: 4000 
      });
    }
  }
}