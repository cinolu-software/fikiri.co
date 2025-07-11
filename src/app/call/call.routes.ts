import { Routes } from '@angular/router';

export const callRoutes: Routes = [
  {
    path: ':slug',
    title: 'Call Details',
    loadComponent: () => import('./feature/call.component').then((c) => c.CallComponent),
  },
];
