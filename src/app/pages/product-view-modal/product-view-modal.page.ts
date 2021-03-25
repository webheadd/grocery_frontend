import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-modal',
  templateUrl: './product-view-modal.page.html',
  styleUrls: ['./product-view-modal.page.scss'],
})
export class ProductViewModalPage implements OnInit {
  @Input() product;
  @Input() rootImg: string;
  @Input() addToCart: any;

  @Input() cartBadge: BehaviorSubject<number>;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  addCart(event, product) {
    this.addToCart.emit({'event': event, 'product': product});
  }

  addQuantity(product) {
    product.qty++;
  }

  minusQuantity(product) {
    if (product.qty <= 0) { return; }
    product.qty--;
  }

}
