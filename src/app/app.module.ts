import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerModule } from './modules/customer/customer.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerValidator } from './services/add-customer-validator.service'; // import CustomerValidator

@NgModule({
  declarations: [
    AppComponent
  ],
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomerModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CustomerValidator], // add CustomerValidator to providers
  bootstrap: [AppComponent]
})
export class AppModule { }
