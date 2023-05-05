import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CityListComponent } from './city-list/city-list.component';
import { AddCityComponent } from './add-city/add-city.component';
import { EditCityComponent } from './edit-city/edit-city.component';

const routes: Routes = [
    { path: 'cities', component: CityListComponent },
    { path: 'add-city', component: AddCityComponent },
    { path: 'edit-city/:id', component: EditCityComponent }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CityRoutingModule { }