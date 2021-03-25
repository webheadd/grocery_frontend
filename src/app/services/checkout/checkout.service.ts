import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  returnedOpt: string;
  public deliveryMethodOption = new BehaviorSubject('');
  public deliveryDate = new BehaviorSubject('');

  constructor() { }

  setDeliveryDate(value) {
    this.deliveryDate.next(value);
  }
  getDeliveryDate() {
    return this.deliveryDate;
  }


  setDeliveryOpt(value) {
    this.deliveryMethodOption.next(value);
  }
  getDeliveryOpt() {
    return this.deliveryMethodOption;
  }
}
