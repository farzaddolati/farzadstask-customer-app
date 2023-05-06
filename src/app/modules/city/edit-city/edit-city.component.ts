import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { CityValidator } from 'src/app/services/city-validator.service';
import { ValidationErrors } from 'fluentvalidation-ts/dist/ValidationErrors';
import { CityService } from 'src/app/services/city.service';
import { City } from 'src/app/models/city.model';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('')    
  });
  // form: FormGroup = new FormGroup({});
  city: City = { id: 0, name: '' };
  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const cityId = params['id'];
      this.cityService.getCityById(cityId).subscribe(city => {
        this.city = city;
        this.form = this.formBuilder.group({
          name: [city.name, Validators.required]         
        });
        
      });
    });
  }

  validator:CityValidator = new CityValidator();
  validationResult: ValidationErrors<City> = {};

  async onSubmit(): Promise<void> {
    const city: City = {
      id: this.city.id,
      name: this.form.value.name
    };
  
    this.validationResult = this.validator.validate(city);
    if (Object.keys(this.validationResult).length <= 0) {
      try {
        await this.cityService.updateCity(city).toPromise();
        this.form.reset();
        this._snackBar.open('City updated successfully!', 'Info', {
          duration: 2000 
        });
        this.router.navigate(['/city'], { relativeTo: this.route });
      } catch (error) {
        this._snackBar.open('An error occurred while updating city!', 'Dismiss', {
          duration: 4000 
        });
      }
    } else {
      this._snackBar.open('Please Solve Error Messages!', 'Dismiss', {
        duration: 4000 
      });
    }
  }


}