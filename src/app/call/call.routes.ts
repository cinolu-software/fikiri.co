import { Routes } from '@angular/router';

export const callRoutes: Routes = [
  {
    path: ':id',
    title: 'Call Details',
    loadComponent: () => import('./feature/call.component').then((c) => c.CallComponent),
  },
];
