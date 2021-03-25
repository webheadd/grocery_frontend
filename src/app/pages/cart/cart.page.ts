import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from "@ionic/angular";
import { BehaviorSubject } from 'rxjs';
import { AuthService } from "../../services/authService/authService";
import { ProductService } from "../../services/products/product-service.service";
import { LoaderService } from "../../services/loader/loader.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  userCart;
  cart: Array<any> = [];

  btnShow: boolean = true;

  sub_total: number = 0;

  rootImg: string = this.productService.rootImage;

  currentUser: any;

  noCartItems: boolean = false;

  cartBadge: BehaviorSubject<number>;

  constructor(
    public auth: AuthService,
    public productService: ProductService,
    public loader: LoaderService,
    public navCtrl: NavController) {
      this.currentUser = this.auth.getCurrentUser();
      console.log(this.currentUser)
    }

  ngOnInit() {
    this.getCart();
    this.cartBadge = this.productService.getBadgeCount();
  }

  initCartItems(cart) {
    cart.forEach((cartItem, index) => {
        const quantity = cartItem.qty;
        this.sub_total = this.sub_total + (cartItem.qty * cartItem.product.price);
        this.cart.push({
          "product": cartItem.product,
          "qty": quantity,
          "updateQty": 0
        })
      })
    
  }

  getCart() {
    console.log(this.currentUser._id)
    this.productService.getCart(this.currentUser._id).subscribe(
      (res: any) => { 
        if(res.status === "OK") {
          this.userCart = res.result.cart_items;
          return this.initCartItems(this.userCart);
        }
      },
      err => {
        console.log(err)
      }
    );
  }
  

  save(emitted) {
    console.log(emitted)
    const qty = emitted.updateQty;
    const productID = emitted.product.productID
    const cart = {
      customerID: this.currentUser._id,
      products: [
        {
          productID: productID,
          qty: qty
        }
      ]
    }
      // if(emitted.updateQty !== 0) {
      //   return this.productService.addToCart(cart).subscribe(
      //     (res: any) => {
      //       alert("Product updated!")
      //       emitted.updateQty = 0;
      //       return this.auth.cart = res.products
      //     },
      //     err => {
      //       return console.log(err)
      //     }
      //   )
      // };
      return console.log("still 0");
  }

  addQuantity(emitted) {
    emitted.qty++;    
    emitted.updateQty++;
    this.sub_total = this.sub_total + emitted.product.price
  }

  minusQuantity(emitted) {
    if(emitted.qty <= 1) return alert("Delete this product from your");
    
    emitted.qty--;
    emitted.updateQty--;
    this.sub_total = this.sub_total - emitted.product.price;
    
  }
  
  delete(product) {
    let prodIndex = this.cart.findIndex(prod => prod.product.productID === product.product.productID);
    if(prodIndex !== -1) {
      this.productService.setBadgeCount(this.cartBadge.value - 1)
      this.sub_total = this.sub_total - (product.qty * product.product.price);
      this.cart.splice(prodIndex, 1);

      this.productService.deleteFromCart(product.product.productID).subscribe((res: any) => {
        if(res.success) {
          console.log(res.result.message)
        }
      });
    }
  }


  //CHECKOUT
  checkout(items) {
    this.navCtrl.navigateForward(['/checkout'], { queryParams: { cart: JSON.stringify(items)} })
  }
}
