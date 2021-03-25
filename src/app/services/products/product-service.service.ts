import { Injectable } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { ProductViewModalPage } from "../../pages/product-view-modal/product-view-modal.page";
import { environment as env } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from 'rxjs';

//model
import { Product } from "../../models/productModel"
import { Cart } from "../../models/cartItem"

import httpOptions from "../httpOptions";
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  rootImage = "https://via.placeholder.com/150x150";
  cart: Array<any>;
  public cartBadge = new BehaviorSubject(0);

  selected_category: string = null;


  constructor(public http: HttpClient,
              public modalController: ModalController) { }

  //modal
  async presentModal(product, addToCart, cartBadge) {
    const modal = await this.modalController.create({
      component: ProductViewModalPage,
      componentProps: {
        product: product,
        rootImg: this.rootImage,
        addToCart: addToCart,
        cartBadge: cartBadge
      }
    });
    return await modal.present();
  }


  //badge
  badge() {
    this.cartBadge.next(this.cartBadge.value + 1);
  }
  setBadgeCount(value) {
    this.cartBadge.next(value);
  }
  getBadgeCount() {
    return this.cartBadge;
  }


  //products related

  // @desc: get products based in type
  // @type: either new or featured
  getAllProducts(type?): Observable<Product[]> {
    return this.http.post<Product[]>(`${env.API_URL}/products`, JSON.stringify(type), httpOptions);
  }

  //get products based in category id
  getProducts(categoryID): Observable<Product[]> {
    return this.http.get<Product[]>(`${env.API_URL}/products/category/${categoryID}`, httpOptions);
  }

  //get featured or new products - dedicated route
  getFeaturedOrNew(category): Observable<Product[]> {
    return this.http.get<Product[]>(`${env.API_URL}/products/${category}`, httpOptions);
  }

  //get product details
  getProductDetails(productID): Observable<Product[]> {
    return this.http.get<Product[]>(`${env.API_URL}/cart/item/${productID}`, httpOptions);
  }

  //cart related
  //add item to cart
  addToCart(item): Observable<Cart[]> {
    console.log(item)
    return this.http.post<Cart[]>(`${env.API_URL}/cart/addToCart`, JSON.stringify(item), httpOptions);
  }

  //delete cart item
  deleteFromCart(productID): Observable<Cart[]> {
    return this.http.delete<Cart[]>(`${env.API_URL}/cart/delete/${productID}`, httpOptions);
  }

  //get current user's cart
  getCart(customerID): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${env.API_URL}/cart/${customerID}`, httpOptions);
  }


}
