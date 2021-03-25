import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from "@angular/common/http"
import { AuthService } from "../authService/authService"

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public injector: Injector,
              public service: AuthService) {
  //  this.token = localStorage.getItem('token');
   
  }

  //todo token

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const token = localStorage.getItem('token');
    req = req.clone({
      setHeaders: {
        "Authorization": `Bearer ${token}`
      }
    });

    return next.handle(req);
  }

}
