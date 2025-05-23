import { Routes } from '@angular/router';

export const solutionsRoutes: Routes = [
  {
    path: '',
    title: 'Solutions',
    loadComponent: () => import('./feature/list/solutions.component').then((c) => c.SolutionsComponent)
  },
  {
    path: ':id',
    title: 'Solution',
    loadComponent: () => import('./feature/details/solution.component').then((c) => c.SolutionComponent)
  }
];
