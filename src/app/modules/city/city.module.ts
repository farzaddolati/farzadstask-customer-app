import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityListComponent } from './city-list/city-list.component';
import { AddCityComponent } from './add-city/add-city.component';
import { EditCityComponent } from './edit-city/edit-city.component';



@NgModule({
  declarations: [
    CityListComponent,
    AddCityComponent,
    EditCityComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CityModule { }
