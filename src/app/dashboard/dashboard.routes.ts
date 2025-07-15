import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    title: 'Dashboard',
    loadComponent: () => import('./features/home/dashboard-home.component').then((c) => c.DashboardHomeComponent),
  },
  {
    path: 'account',
    title: 'Account',
    loadComponent: () =>
      import('./features/account/dashboard-account.component').then((c) => c.DashboardAccountComponent),
  },
  {
    path: 'users',
    title: 'Users',
    loadComponent: () => import('./features/users/dashboard-users.component').then((c) => c.DashboardUsersComponent),
  },
  {
    path: 'calls',
    title: 'Calls',
    loadComponent: () => import('./features/calls/dashboard-calls.component').then((c) => c.DashboardCallsComponent),
  },
  {
    path: 'solutions',
    title: 'Solutions',
    loadComponent: () =>
      import('./features/solutions/dashboard-solutions.component').then((c) => c.DashboardSolutionsComponent),
  },
  {
    path: 'outreachers',
    title: 'Outreachers',
    loadComponent: () =>
      import('./features/outreachers/dashboard-outreachers.component').then((c) => c.DashboardOutreachersComponent),
  },
];
