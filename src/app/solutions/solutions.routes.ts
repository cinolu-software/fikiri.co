import { Routes } from '@angular/router';

export const solutionsRoutes: Routes = [
  {
    path: '',
    title: 'Solutions',
    loadComponent: () => import('./features/list/solutions.component').then((c) => c.SolutionsComponent),
  },
  {
    path: ':slug',
    title: 'Solution',
    loadComponent: () => import('./features/details/solution.component').then((c) => c.SolutionComponent),
  },
];
