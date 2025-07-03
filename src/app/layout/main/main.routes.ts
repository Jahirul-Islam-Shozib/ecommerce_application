import {Routes} from '@angular/router';
import {MainComponent} from "./main.component";

export const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('../../workspace/home-page/home-page.component').then(m => m.HomePageComponent),
      },
      {
        path: 'products',
        loadComponent: () => import('../../workspace/all-products/all-products.component').then(m => m.AllProductsComponent),
      }
    ]
  }
];
