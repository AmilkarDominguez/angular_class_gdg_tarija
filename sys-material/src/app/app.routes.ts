import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { Login } from './features/auth/login/login';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: Login,
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayout
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
