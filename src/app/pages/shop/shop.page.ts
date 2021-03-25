import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
import { ProductService } from "../../services/products/product-service.service"

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  cartBadge: BehaviorSubject<number>;

  categories = [
    {
      id: 0,
      name: "All Products",
      icon: "cube"
    },
    {
      id: 1,
      name: "Beverages",
      icon: "beer"
    },
    {
      id: 2,
      name: "Bread/Bakery",
      icon: "cube"
    },
    {
      id: 3,
      name: "Canned Goods",
      icon: "cube"
    },
    {
      id: 4,
      name: "Dairy",
      icon: "cube"
    },
    {
      id: 5,
      name: "Dry & Baking",
      icon: "cube"
    },
    {
      id: 6,
      name: "Frozen",
      icon: "cube"
    },
    {
      id: 7,
      name: "Meat",
      icon: "cube"
    },
    {
      id: 8,
      name: "Produce",
      icon: "cube"
    },
    {
      id: 9,
      name: "Cleaners",
      icon: "cube"
    },
    {
      id: 10,
      name: "Paper Goods",
      icon: "cube"
    },
    {
      id: 11,
      name: "Personal Care",
      icon: "cube"
    }
  ]

  constructor(public productService: ProductService,
              public navCtrl: NavController) { }

  ngOnInit() {
    this.cartBadge = this.productService.getBadgeCount();
  }

  openProductsPage(category) {
    const category_id = category.id;
    this.productService.selected_category = category.name;
    this.navCtrl.navigateForward(['/products'], { queryParams: { category: category_id }, });
  }
}
