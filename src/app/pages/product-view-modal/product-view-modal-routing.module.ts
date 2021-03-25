import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductViewModalPage } from './product-view-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProductViewModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductViewModalPageRoutingModule {}
