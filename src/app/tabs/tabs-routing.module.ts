import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

//guard
import { AuthGuardGuard } from "../services/authGuard/auth-guard.guard"


const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [{
          path: "",
          loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
        }]
        
      },
      {
        path: 'shop',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/shop/shop.module').then(m => m.ShopPageModule)
          }
        ]
        
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/account/account.module').then(m => m.AccountPageModule),
            canActivate: [AuthGuardGuard]
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
