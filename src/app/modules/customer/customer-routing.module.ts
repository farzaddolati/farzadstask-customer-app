import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

const routes: Routes = [
  { path: 'customer', component: CustomerListComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'edit-customer/:id', component: EditCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }