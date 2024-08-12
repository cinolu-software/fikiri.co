import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authRoutes } from './pages/auth/auth.routes';

export const routes: Routes = [
  {
    path: 'solutions/:id',
    title: 'Solution - details',
    loadComponent: () => import('./pages/solution/solution.component').then((c) => c.SolutionComponent)
  },
  {
    path: 'solutions',
    title: 'Solutions',
    loadComponent: () => import('./pages/solutions/solutions.component').then((c) => c.SolutionsComponent)
  },
  {
    path: 'register',
    title: 'Inscription',
    loadComponent: () => import('./pages/auth/register/register.component').then((c) => c.RegisterComponent)
  },
  {
    path: 'auth',
    children: authRoutes
  },

  {
    path: '',
    title: 'Accueil',
    component: HomeComponent
  },
  {
    path: '**',
    title: 'Page non trouvée',
    loadComponent: () => import('./pages/not-found/not-found.component').then((c) => c.NotFoundComponent)
  }
];
