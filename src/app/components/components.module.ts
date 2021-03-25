import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule, } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductComponent } from "./product/product.component";
import { CartItemComponent } from "./cart-item/cart-item.component";
import { CartFabComponent } from "./cart-fab/cart-fab.component";

@NgModule({
  declarations: [
    ProductComponent,
    CartItemComponent,
    CartFabComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductComponent,
    CartItemComponent,
    CartFabComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class ComponentsModule { }
