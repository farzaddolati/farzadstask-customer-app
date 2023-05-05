import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/city.service';
import { RouterModule, Routes } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { CityValidator } from 'src/app/services/city-validator.service';
import { ValidationErrors } from 'fluentvalidation-ts/dist/ValidationErrors';


@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['']     
    });

    

  }

  

  validator:CityValidator = new CityValidator();
  validationResult: ValidationErrors<City> = {};
  
  

  async onSubmit(): Promise<void> {
    const city: City = this.form.value;
    
  
    this.validationResult = this.validator.validate(city);
  
    if (Object.keys(this.validationResult).length <= 0) {
      try {
       
        await this.cityService.addCity(city).toPromise();
        this.form.reset();
        this._snackBar.open('City added successfully!', 'Info', {
          duration: 2000 
        });
  
        this.router.navigate(['../city'], { relativeTo: this.route });
      } catch (error) {
        this._snackBar.open('An error occurred while adding city!', 'Dismiss', {
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
