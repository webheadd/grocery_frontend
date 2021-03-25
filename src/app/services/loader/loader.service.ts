import { Injectable } from '@angular/core';
import {LoadingController} from "@ionic/angular";
@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(public loadingController: LoadingController) { }

  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: "bubbles",
      cssClass: 'loader'
    });
    await loading.present();
  }
}
