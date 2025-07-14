import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    title: 'Dashboard',
    loadComponent: () => import('./features/dashboard.component').then((c) => c.DashboardComponent),
  },
  {
    path: 'account',
    title: 'Account',
    loadComponent: () => import('./features/account/account.component').then((c) => c.AccountComponent),
  },
];
