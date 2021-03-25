import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryMethodPageRoutingModule } from './delivery-method-routing.module';

import { DeliveryMethodPage } from './delivery-method.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryMethodPageRoutingModule
  ],
  declarations: [DeliveryMethodPage]
})
export class DeliveryMethodPageModule {}
