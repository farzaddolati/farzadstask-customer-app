import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';


@NgModule({
  declarations: [
    CustomerListComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    
  ],

  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    CustomerRoutingModule ,
    
  ]
})
export class CustomerModule { }
