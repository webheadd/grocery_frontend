import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from "./services/authGuard/auth-guard.guard"

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/welcome-page/welcome-page.module').then( m => m.WelcomePagePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    // canActivate: [AuthGuardGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'welcome-page',
    loadChildren: () => import('./pages/welcome-page/welcome-page.module').then( m => m.WelcomePagePageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'product-view-modal',
    loadChildren: () => import('./pages/product-view-modal/product-view-modal.module').then( m => m.ProductViewModalPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'set-location',
    loadChildren: () => import('./pages/set-location/set-location.module').then( m => m.SetLocationPageModule)
  },
  {
    path: 'delivery-method',
    loadChildren: () => import('./pages/delivery-method/delivery-method.module').then( m => m.DeliveryMethodPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
