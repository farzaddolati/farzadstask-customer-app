import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';



@NgModule({
  declarations: [
    CustomerListComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class CustomerModule { }
