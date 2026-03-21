import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Login } from './features/auth/login/login';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: Login,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '', component: Dashboard },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/dashboard/product/product-dashboard').then((m) => m.ProductDashboard),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];

