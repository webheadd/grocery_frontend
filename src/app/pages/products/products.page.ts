import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActionSheetController, NavController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { ProductService } from "../../services/products/product-service.service";
import { AuthService } from "../../services/authService/authService";

//models
import { Product } from "../../models/productModel";
import { User } from "../../models/userModel";

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  @ViewChild('backIcon', { static: false }) backIcon;
  @HostListener('window:resize', ['$event'])

  cartBadge: BehaviorSubject<number>;
  pageTitle: String;
  currentUser: User = this.auth.currentUser;
  products: Array<any> = []; 
  productsCopy: Array<Product[]>;

  showImageIfEmpty: boolean = false;
  screenHeight: number;

  selectedSortOption: string;

  constructor(public route: ActivatedRoute,
              public productService: ProductService,
              public auth: AuthService,
              public actnCtrl: ActionSheetController,
              public navCtrl: NavController) { }

  ngOnInit() {
    this.cartBadge = this.productService.getBadgeCount();

    this.getScreenSize();
    this.getParams();
    
    
  }

  getParams() {
    if(this.route.snapshot.queryParams.product) {
      const type = {
        type: this.route.snapshot.queryParams.product
      };
      this.pageTitle = this.route.snapshot.queryParams.product
      return this.productService.getAllProducts(type).subscribe(
        (res: any) => {
          if(res.success) {
            res.result.products.map(product => {
              this.products.push({...product, qty: 0});
            });
          }
      },
      err => console.log(err)
      )
    }
    if(this.route.snapshot.queryParams.category) {
      const category = this.route.snapshot.queryParams.category;
      this.pageTitle = this.productService.selected_category;
      return this.productService.getProducts(category).subscribe(
        (res: any) => {
          if(res.success) {
            if(res.result.products.length !== 0) {
              return res.result.products.map(product => {
                this.products.push({...product, qty: 0});
              });
            }
            return this.showImageIfEmpty = true;
          }
          
      },
      err => console.log(err)
      )
    }
  }

  getScreenSize() {
    this.screenHeight = window.innerHeight;
  }

  //open modal
  async presentActionSheet() {
    const actionSheet = await this.actnCtrl.create({
      header: 'Arrange by',
      buttons:
    [
      {
        text: 'Name: Alphabetical',
        icon: 'share',
        handler: () => {
          this.products.sort((a, b) => {
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 1;
          })
          this.selectedSortOption = 'Name: Alphabetical';
        }
      },
      {
        text: 'Price: Highest to Lowest',
        icon: 'heart',
        handler: () => {
          this.products.sort((a, b) => {
            return b.price - a.price;
          })
          this.selectedSortOption = 'Price: High to Low';
        }
      },
      {
        text: 'Price: Lowest to Highest',
        icon: 'heart',
        handler: () => {
          this.products.sort((a, b) => {
            return a.price - b.price;
          })
          this.selectedSortOption = 'Price: Low to High';
        }
      }
    ]
    });
    await actionSheet.present();
  }

  
  // //START OF FUNCTIONS
  addToCart(emittedEvents) {
    if(emittedEvents.event.target.quantity.value !== "0") {

      const qty = Number(emittedEvents.event.target.quantity.value);
      const productID = emittedEvents.product.productID;
      const customerID = this.currentUser.customerID

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

  //go back
  back() {
    this.navCtrl.back();
  }

  //scroll event
  onWindowScroll(e) {
    const distanceFromTop = e.detail.scrollTop;
    const thirtyPercentOfScreen = this.screenHeight * 0.25;
    
    if(distanceFromTop > thirtyPercentOfScreen) {
        return this.backIcon.el.classList.add('navbar-inverse');
    }
    this.backIcon.el.classList.remove('navbar-inverse');
  }

}
