import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from "@angular/common/http";
import { ToastController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private toastCtrl: ToastController,
              private loadCtrl: LoadingController) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(!req.headers.get("skip")) {
      this.loadCtrl.getTop().then(hasLoading => {
        if(!hasLoading) {
          return this.presentLoading();
        }
        this.loadCtrl.dismiss();
    })
    }


  return next.handle(req).pipe(
      finalize(() => {
          this.loadCtrl.getTop().then(hasLoading => {
              if(hasLoading) {
                  return this.loadCtrl.dismiss();
              }
          })
      })
  )
  }

  async presentLoading() {
    const loading = await this.loadCtrl.create({
        cssClass: 'loading'
    });
    await loading.present();
  }

}
