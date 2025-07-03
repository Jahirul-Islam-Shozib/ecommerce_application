import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',
    loadChildren: () => import('./layout/main/main.routes').then(m => m.mainRoutes)
  },
  {
    path: 'auth',
    loadChildren: ()=>import('./auth/auth.routes').then(m => m.authRoutes)
  }
];
