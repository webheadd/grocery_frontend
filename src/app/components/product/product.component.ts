import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from "../../services/products/product-service.service"
import { AuthService } from "../../services/authService/authService"

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() public product: any;
  @Input() src: any;
  @Output() addToCartHandler: EventEmitter<any> = new EventEmitter()

  rootImg = this.productService.rootImage;
  currentUser = this.auth.currentUser;
  cartBadge: BehaviorSubject<number>;


  constructor(public productService: ProductService,
              public auth: AuthService) { }
              

  ngOnInit() {
    this.cartBadge = this.productService.getBadgeCount();
  }

  
 //START OF FUNCTIONS
  addToCart(event, product) {
    event.stopPropagation();
    this.addToCartHandler.emit({"event": event, "product": product});
  }

  addQuantity(product, event) {    
    event.stopPropagation();
    product.qty++;
  }

  minusQuantity(product, event) {
    event.stopPropagation();
    if(product.qty <= 0) return;
    product.qty--;
  }

  openProductView(product, func) {
    this.productService.presentModal(product, func, this.cartBadge);
  }

  fallbackImage(e) {
    this.product.img = this.rootImg;
  }
}
