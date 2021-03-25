import { User } from './../../models/userModel';
import { Component, OnInit } from '@angular/core';

//services
import { AuthService } from '../../services/authService/authService';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  profile: User;

  constructor(public auth: AuthService) {
    this.profile = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    console.log(this.profile)
  }

  logout() {
    return this.auth.initLogout();
  }

}
