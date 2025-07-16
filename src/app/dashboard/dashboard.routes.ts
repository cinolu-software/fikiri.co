import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    title: 'Dashboard',
    loadComponent: () => import('./features/home/home.component').then((c) => c.DashboardHomeComponent),
  },
  {
    path: 'account',
    title: 'Account',
    loadComponent: () => import('./features/account/account.component').then((c) => c.AccountComponent),
  },
  {
    path: 'users',
    title: 'Users',
    loadComponent: () => import('./features/users/users.component').then((c) => c.DashboardUsersComponent),
  },
  {
    path: 'calls',
    title: 'Calls',
    loadComponent: () => import('./features/calls/calls.component').then((c) => c.DashboardCallsComponent),
  },
  {
    path: 'solutions',
    title: 'Solutions',
    loadComponent: () => import('./features/solutions/solutions.component').then((c) => c.DashboardSolutionsComponent),
  },
  {
    path: 'outreachers',
    title: 'Outreachers',
    loadComponent: () =>
      import('./features/outreachers/outreachers.component').then((c) => c.DashboardOutreachersComponent),
  },
];
