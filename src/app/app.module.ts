import { LoadingInterceptor } from './services/loadingInterceptor.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthGuardGuard } from "./services/authGuard/auth-guard.guard"
import { AuthService } from "./services/authService/authService"
import { ProductService } from "./services/products/product-service.service"

//Modals
import { DeliveryMethodPageModule  } from "./pages/delivery-method/delivery-method.module";
import { ProductViewModalPageModule } from './pages/product-view-modal/product-view-modal.module';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from "./services/tokenInterceptor/token-interceptor.service"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const ineterceptors = [
  { 
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
  // { 
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: LoadingInterceptor,
  //   multi: true
  // }
]

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule, ProductViewModalPageModule, DeliveryMethodPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    ReactiveFormsModule,
    AuthService,
    AuthGuardGuard,
    Geolocation,
    NativeGeocoder,
    ProductService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ineterceptors
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
