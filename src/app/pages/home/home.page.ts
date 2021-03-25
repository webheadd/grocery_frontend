import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Platform, NavController } from "@ionic/angular"
import { ProductService } from "../../services/products/product-service.service"
import { AuthService } from "../../services/authService/authService"
import { BehaviorSubject, forkJoin } from "rxjs";

//models
import { User } from "../../models/userModel";
import { Product } from "../../models/productModel";
import { tap, mergeMap } from 'rxjs/operators';
import { Cart } from 'src/app/models/cartItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('formCon', {static: false}) formContainer: ElementRef;

  featuredProducts: Array<Product> = [];
  newProducts: Array<Product> = [];
  currentUser: User;

  badge: Number;
  customerCart: any;

  timeOfDay: String;

  rootImg = this.productService.rootImage;

  userToken: String = localStorage.getItem('token');

  cartBadge: BehaviorSubject<number>;

  products: Product[] = [];

  slideOptions = {
    // initialSlide: ,
    spaceBetween: 15,
    slidesPerView: "auto",
    freeMode: true,
    setWrapperSize: true
  }

  constructor(public productService: ProductService,
              public platform: Platform,
              public auth: AuthService,
              public navCtrl: NavController) {
                this.currentUser = this.auth.getCurrentUser();


                //todo: CHECK this then if working do the expiration of token
                if(this.platform.is('cordova')) {
                  //if in background
                  this.platform.pause.subscribe(() => {
                    alert("paused")
                  })
                } else {
                  this.platform.resume.subscribe(() => {
                    alert("resume")
                  })
                }
   }

  ngOnInit() {
    this.loadHomeData();
  }

  ionViewWillEnter() {
    this.cartBadge = this.productService.getBadgeCount();
    this.timeOfDay = this.getTimeOfDay();
  }


  loadHomeData() {
    this.getAllProducts();
    // this.getUserDetails();
  }


  getAllProducts() {
    // GET FEATURED PRODUCTS
    this.productService.getAllProducts().subscribe(
      (res: any) => {
        console.log(res, "QWEQWE")
        if(res.status === "OK") {
          this.products = res.result.products;
          
          //get featured products
          const featured = res.result.products.filter(product => product.is_featured)
          this.featuredProducts = featured.map(product => {
            product.qty = 0;
            return product;
          })
          //get new products
          const newProducts = res.result.products.filter(product => product.is_new);
          this.newProducts = newProducts.map(product => {
            product.qty = 0;
            return product;
          })
          return
        }
      },
      err => console.log(err)
    );
  }

  // //START OF FUNCTIONS
  addToCart(emittedEvents) {
    if(emittedEvents.event.target.quantity.value !== "0") {

      const qty = Number(emittedEvents.event.target.quantity.value);
      const productID = emittedEvents.product.productID;
      const customerID = this.currentUser['_id'];

      const cart = {
        customerID: customerID,
        products: [
          {
            productID: productID,
            qty: qty
          }
        ]
      }

      this.productService.addToCart(cart).subscribe(
        (product: any) => {
          if(product.exist) {
            
            return alert("Cart updated!")
            
          }
          this.productService.badge();
          return alert("Added to cart!")
        },
        error => {
          console.log(error)
        }
      );

      emittedEvents.event.target.quantity.value = 0;
      emittedEvents.product.qty = 0;

      } else {
        alert("No product quantity is 0")
      }
  }

  // to products page
  openProductsPage(params) {
    this.navCtrl.navigateForward(['/products'], { queryParams: { product: params} });
  }

  // get time of day
  getTimeOfDay() {
    const today = new Date();
    const h = today.getHours();
    const m = today.getMinutes();
    const s = today.getSeconds();
    if(h <= 11 && m <= 59 && s <= 59) return "Morning";
    if(h <= 16 && m <= 59 && s <= 59) return "Afternoon";
    return "Evening";
  }

}
