import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryMethodPage } from './delivery-method.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryMethodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryMethodPageRoutingModule {}
