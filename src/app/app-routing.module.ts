import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './modules/customer/customer-list/customer-list.component';
import { CityListComponent } from './modules/city/city-list/city-list.component';

const routes: Routes = [
  { path: '', component: CustomerListComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'cities', component: CityListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
