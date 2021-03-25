import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductViewModalPageRoutingModule } from './product-view-modal-routing.module';

import { ProductViewModalPage } from './product-view-modal.page';

import { ComponentsModule } from "../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ProductViewModalPageRoutingModule
  ],
  declarations: [ProductViewModalPage]
})
export class ProductViewModalPageModule {}
