import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NavController, ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

//service
import { CheckoutService } from '../../services/checkout/checkout.service';
import { AuthService } from '../../services/authService/authService';

//modal
import { DeliveryMethodPage  } from "../../pages/delivery-method/delivery-method.page";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  cartItems: Array<any>;
  subtotal: number = 0;
  delivery_fee: number = 50;
  total: number = 0;

  today: Date = new Date();
  deliveryAddress: string;

  totalNumberOfItems: number;
  deliveryIsChecked: boolean = false;

  deliveryMethod: BehaviorSubject<string>;
  deliveryDate: BehaviorSubject<string>;

  currentUser: any;

  constructor(public route: ActivatedRoute,
              private nativeGeocoder: NativeGeocoder,
              public navCtrl: NavController,
              public checkOutService: CheckoutService,
              public auth: AuthService,
              public modalCtrl: ModalController) { }

  ngOnInit() {
    this.cartItems = JSON.parse(this.route.snapshot.queryParams.cart);
    this.totalNumberOfItems = this.cartItems.length;
    this.deliveryMethod = this.checkOutService.getDeliveryOpt();
    this.deliveryDate = this.checkOutService.getDeliveryDate();

    //get subtotal of all items in cart (order quantity * product price)
    this.cartItems.forEach(cartItem => {
      const productTotalPrice = cartItem.qty * cartItem.product.price;
      this.subtotal = this.subtotal + productTotalPrice;
    })
    
    // add subtotal and delivery fee to get total amount
    this.total = this.subtotal + this.delivery_fee;  
    
    //current user
    this.currentUser = this.auth.currentUser;
  }

  ionViewWillEnter() {
    this.getSavedAddressAndConvert();
    console.log("entered")
  }

  getSavedAddressAndConvert() {
    const { lat, lng } = JSON.parse(localStorage.getItem('deliveryAddress'));
    console.log(lat, lng, "QWEQWE")

  //   let options: NativeGeocoderOptions = {
  //     useLocale: true,
  //     maxResults: 5
  // };

  //   if(lat && lng) {
  //     console.log(true)
  //     // return this.nativeGeocoder.reverseGeocode(lat, lng, options)
  //     // .then((res: NativeGeocoderResult[]) => { 
  //     //   alert(res + " GEOCODER")
  //     // })
  //     // .catch(err => alert(err + " GEOCODER ERROR"))
  //   }
  //   return alert("No saved address yet");
  }

  radioChanged(e) {
    if(e.target.value === 'delivery') return this.deliveryIsChecked = true; 
    return this.deliveryIsChecked = false;
  }

  // set address
  setLocation() {
    this.navCtrl.navigateForward('set-location');
  }

 //modal
 async presentModal() {
  const modal = await this.modalCtrl.create({
    component: DeliveryMethodPage,
    showBackdrop: true,
    cssClass: 'delivery_method_modal'
  });
  await modal.present();

  const { data } = await modal.onDidDismiss();
  console.log(data)
  // return this.returnedOpt = data.delivery_method;
}

  //open delivery method modal
  openDeliveryMethodModal() {
    this.addDayFromOrderDate();
    this.presentModal();
  }

  addDayFromOrderDate() {
    
    // return this.deliveryDate = today.toDateString();
  }

  placeOrder(e) {
    const { customerID, fname, lname, mobile } = this.currentUser;
    const customer = {
      customerID: customerID,
      name: fname + " " + lname,
      mobile: mobile
    }

    //ADD ADDRESS
    const order = {
      orderOpt: e.target.radio.value,      //delivery or pickup
      deliveryMethod: this.deliveryMethod.value,
      notes: e.target.notes.value,
      subtotal: this.subtotal,
      delivery_fee: this.delivery_fee,
      total: this.total,
      orderedProducts: this.cartItems,
      customer: customer
    }
    

    console.log(order)
  }
}
