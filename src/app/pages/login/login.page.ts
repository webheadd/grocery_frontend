import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from "../../services/authService/authService";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(public navCtrl: NavController,
    public auth: AuthService,
    private formBuilder: FormBuilder) {

      this.loginForm = this.formBuilder.group({
        mobileNumber: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required),
      })
      

    }

  ngOnInit() {
  }


  toRegister() {
    this.navCtrl.navigateForward('sign-up');
  }

  login(mobile: Number, password: String) {
    const passData = {
      mobile: mobile,
      password: password
    }
    // this.navCtrl.navigateRoot('tabs/home')
    this.auth.initLogin(passData).subscribe(
      result => {
        console.log(result)
        if(result) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('userData', JSON.stringify(result.currentUser));
          
          this.navCtrl.navigateRoot('tabs/home')
        }
      },
      err => {
        if(err.status === 401) {
          return console.log("Username or Password is incorrect");
        } else {
          return alert(err.error)
        }
      });
  }
}
