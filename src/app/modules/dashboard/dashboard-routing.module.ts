import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppdashboardComponent } from './appdashboard/appdashboard.component';

const routes: Routes = [
    { path: 'appdashborad', component: AppdashboardComponent }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CityRoutingModule { }