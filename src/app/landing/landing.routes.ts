import { Routes } from '@angular/router';

export const landingRoutes: Routes = [
  {
    path: '',
    title: 'Home',
    loadComponent: () => import('./features/home/landing-home.component').then((c) => c.LandingHomeComponent),
  },
];
