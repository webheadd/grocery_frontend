import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { CheckoutService } from '../../services/checkout/checkout.service';

@Component({
  selector: 'app-delivery-method',
  templateUrl: './delivery-method.page.html',
  styleUrls: ['./delivery-method.page.scss'],
})
export class DeliveryMethodPage implements OnInit {

  deliveryMethod: BehaviorSubject<string>;
  deliveryDate: BehaviorSubject<string>;

  
  deliveryIntervalForStandard: number = 3;
  deliveryIntervalForExpress: number = 1;
  today: Date = new Date();

  constructor(public modalCtrl: ModalController,
              public checkOutService: CheckoutService) { }

  ngOnInit() {
    this.deliveryMethod = this.checkOutService.getDeliveryOpt();//get current value of delivery method
    this.deliveryDate = this.checkOutService.getDeliveryDate();//get current value of delivery method
  }

  dismissModal() {    
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  checkedRadio(e) {
    const today = new Date(this.today);


    this.checkOutService.setDeliveryOpt(e.target.value);//set new delivery method value

    if(e.target.value !== 'standard') {
        today.setDate(this.today.getDate() + this.deliveryIntervalForExpress);
        this.checkOutService.setDeliveryDate(today.toDateString());

        return this.dismissModal();

    }
    today.setDate(this.today.getDate() + this.deliveryIntervalForStandard);
    this.checkOutService.setDeliveryDate(today.toDateString());

    return this.dismissModal();
    
    
  }
}
