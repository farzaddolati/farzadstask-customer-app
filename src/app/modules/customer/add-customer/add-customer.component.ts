import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { RouterModule, Routes } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerValidator } from 'src/app/services/add-customer-validator.service';
import { ValidationErrors } from 'fluentvalidation-ts/dist/ValidationErrors';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  form!: FormGroup;
  

 

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['']
    });
  }

  validator:CustomerValidator = new CustomerValidator();
  validationResult: ValidationErrors<Customer> = {};
  //a:CustomerValidator;
  onSubmit(): void {
    //if (this.form.valid) 
    {
      const customer: Customer = {
        id: this.form.value.id,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        email: this.form.value.email
      };

      this.validationResult = this.validator.validate(customer);
      if (Object.keys(this.validationResult).length <= 0) {
        this.customerService.addCustomer(customer).subscribe(() => {
          this.form.reset();

        });
        this._snackBar.open('Customer added successfully!', 'Dismiss', {
          duration: 2000 // 15 seconds
        });
        this.router.navigate(['../'], { relativeTo: this.route });
      }
      else {
        this._snackBar.open('Please Solve Error Messages!', 'Dismiss', {
          duration: 2000 // 15 seconds
        });
      }
    }
  }
}