import { Component, OnInit } from '@angular/core';
import { NavController  } from "@ionic/angular"
import { AuthService } from "../../services/authService/authService";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.page.html',
  styleUrls: ['./welcome-page.page.scss'],
})
export class WelcomePagePage implements OnInit {

  constructor(public navCtrl: NavController,
              public loginService: AuthService) {
      // //check if token is still in localstorage
      // if(this.loginService.isLoggedIn()) {
      //   this.navCtrl.navigateRoot("tabs/home");
      //   return;
      // }

  }

  ngOnInit() {

  }

  toLogin() {
    this.navCtrl.navigateForward('login');
  }

  toRegister() {
    this.navCtrl.navigateForward('sign-up');
  }
}
