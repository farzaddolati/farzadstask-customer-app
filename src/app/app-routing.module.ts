import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './modules/customer/customer-list/customer-list.component';
import { CityListComponent } from './modules/city/city-list/city-list.component';
import { AppdashboardComponent } from './modules/dashboard/appdashboard/appdashboard.component';

const routes: Routes = [
  { path: '', component: AppdashboardComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'cities', component: CityListComponent}
];

@NgModule({  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
