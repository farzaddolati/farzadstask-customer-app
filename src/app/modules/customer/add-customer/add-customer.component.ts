import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { RouterModule, Routes } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerValidator } from 'src/app/services/customer-validator.service';
import { ValidationErrors } from 'fluentvalidation-ts/dist/ValidationErrors';
import { City } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/city.service';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  form!: FormGroup;
  cities: City[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private customerService: CustomerService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
      address: [''],
      cityId: [null],
      cityName: ['']
    });

    this.cityService.getCities().subscribe(cities => {
      this.cities = cities;
    });
 

  }

  

  validator:CustomerValidator = new CustomerValidator();
  validationResult: ValidationErrors<Customer> = {};
  
  

  async onSubmit(): Promise<void> {
    const customer: Customer = this.form.value;
    // const customer: Customer = {
    //   id: this.form.value.id,
    //   firstName: this.form.value.firstName,
    //   lastName: this.form.value.lastName,
    //   email: this.form.value.email
    // };
  
    this.validationResult = this.validator.validate(customer);
  
    if (Object.keys(this.validationResult).length <= 0) {
      try {
       
        await this.customerService.addCustomer(customer).toPromise();
        this.form.reset();
        this._snackBar.open('Customer added successfully!', 'Info', {
          duration: 2000 
        });
  
        this.router.navigate(['../'], { relativeTo: this.route });
      } catch (error) {
        this._snackBar.open('An error occurred while adding customer!', 'Dismiss', {
          duration: 4000 
        });
      }
    } else {
      this._snackBar.open('Please Solve Error Messages!', 'Dismiss', {
        duration: 4000 
      });
    }
  }

  
  
  // onSubmit(): void {
  //   {
  //     const customer: Customer = {
  //       id: this.form.value.id,
  //       firstName: this.form.value.firstName,
  //       lastName: this.form.value.lastName,
  //       email: this.form.value.email
  //     };

  //     this.validationResult = this.validator.validate(customer);
  //     if (Object.keys(this.validationResult).length <= 0) {
  //       this.customerService.addCustomer(customer).subscribe(() => {
  //         this.form.reset();
  //         this._snackBar.open('Customer added successfully!', 'Info', {
  //           duration: 2000 
  //         });
  //         this.router.navigate(['../'], { relativeTo: this.route });
  

  //       });
  //     }
  //     else {
  //       this._snackBar.open('Please Solve Error Messages!', 'Dismiss', {
  //         duration: 4000 
  //       });
  //     }
  //   }
  // }
}