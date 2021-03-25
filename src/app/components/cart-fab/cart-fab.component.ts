import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

import { ProductService } from "../../services/products/product-service.service"
import { AuthService } from "../../services/authService/authService";


@Component({
  selector: 'app-cart-fab',
  templateUrl: './cart-fab.component.html',
  styleUrls: ['./cart-fab.component.scss'],
})
export class CartFabComponent implements OnInit {
  @Input() badge: number;

  currentUser: String;
  

  constructor(public productService: ProductService,
              public auth: AuthService,
              public navCtrl: NavController,
              public modalCtrl: ModalController) {

              }

  ngOnInit() {
  }

    //CART
    async openCart() {
      const modalIsOpen = await this.modalCtrl.getTop();

      if(modalIsOpen) {
        this.modalCtrl.dismiss();
      }

      return this.navCtrl.navigateForward(['/cart'], { skipLocationChange: true })
      
    }
}
