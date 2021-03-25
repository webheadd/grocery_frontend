import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonSlides } from "@ionic/angular";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  @ViewChild('slider', { static: false }) slider: IonSlides;

  signup: FormGroup;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  activeIndex: number = 0;
  slideLength: number;

  constructor(private fb: FormBuilder) {

    this.signup = this.fb.group({
      personalInfo: this.fb.group({
        fname: new FormControl("", Validators.required),
        lname: new FormControl("", Validators.required),
      }),
      mobileNumber: this.fb.group({
        number: new FormControl("", Validators.required)
      }),
      password: this.fb.group({
        password: new FormControl("", Validators.required)
      })
    })

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.slider.lockSwipes(true);
    this.slider.length().then(len => this.slideLength = len)
  }

  async nextSlide() {
    this.slider.lockSwipes(false)
    this.slider.slideNext();
    this.activeIndex = await this.slider.getActiveIndex();    
  }

  async prevSlide() {
    this.slider.lockSwipes(false);
    this.slider.slidePrev();

    this.activeIndex = await this.slider.getActiveIndex();
  }

  async slideChanged() {
    this.slider.lockSwipes(true);
  }

  initSignup(values) {
    console.log("DONE!", values)
  }

}
