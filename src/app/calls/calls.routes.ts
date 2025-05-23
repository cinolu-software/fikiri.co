import { Routes } from '@angular/router';

export const callsRoutes: Routes = [
  {
    path: '',
    title: 'Calls',
    loadComponent: () => import('./feature/list/calls.component').then((c) => c.CallsComponent)
  }
];
