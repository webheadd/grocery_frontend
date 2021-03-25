import { Injectable } from '@angular/core';
import { NavController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../../environments/environment";
import { Observable } from 'rxjs';

//Models
import { User } from "../../models/userModel"
//http options
import httpOptions from "../httpOptions";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  currentUser: User;
  cart;

  constructor(public http: HttpClient,
    public navCtrl: NavController) {
    }

  getCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem('userData'));
    return currentUser;
  }

  getToken() {
    const token = JSON.parse(localStorage.getItem('token') || '{}');
    console.log("GET TOKEN VALUE ", token)//done for debugging
    return token;
  }
  

  isLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  //login
  initLogin(credentials) {
    return this.http.post<any>(`${env.API_URL}/account/signin`, JSON.stringify(credentials), httpOptions)
  }

  //logout
  initLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.navCtrl.navigateRoot('/login');
  }

  //signup
  signUpHandler(user) {
    return this.http.post<any>(`${env.API_URL}/account/register`, JSON.stringify(user), httpOptions)
  }

}
