import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
  {
    path: 'account',
    title: 'Profile',
    loadComponent: () => import('./features/home/profile.component').then((c) => c.ProfileComponent),
  },
];
