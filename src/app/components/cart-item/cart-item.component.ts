import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from "../../services/products/product-service.service";

// import { Cart } from "../../models/cartItem";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() public product: any;

  @Output() addQtyHandler: EventEmitter<any> = new EventEmitter()
  @Output() minusQtyHandler: EventEmitter<any> = new EventEmitter()
  @Output() saveCartHandler: EventEmitter<any> = new EventEmitter()

  rootImg = this.productService.rootImage;
  constructor(public productService: ProductService) { }

  ngOnInit() {
  }


  addQuantity(product) {
    this.addQtyHandler.emit(product)
  }
  minusQuantity(product) {
    this.minusQtyHandler.emit(product)
  }
  
  save(product) {
    this.saveCartHandler.emit(product);
  }

  fallbackImage(e) {
    this.product.product.img = this.rootImg;
  }
}
