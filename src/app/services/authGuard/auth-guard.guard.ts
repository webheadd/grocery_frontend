import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { NavController } from "@ionic/angular"
import { AuthService } from "../authService/authService"

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(public navCtrl: NavController,
              public loginService: AuthService) {

  }
  canActivate(): boolean {
    if(this.loginService.isLoggedIn()) {
      return true;
    } else {
      this.navCtrl.navigateRoot('/welcome-page');
      return false;
    }
  }  
}
