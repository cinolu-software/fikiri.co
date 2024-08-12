import { Routes } from '@angular/router';
import { authGuard } from '../../shared/guards/auth.guard';

export const authRoutes: Routes = [
  {
    path: 'register',
    title: 'Inscription',
    loadComponent: () => import('./register/register.component').then((c) => c.RegisterComponent)
  },
  {
    path: 'login',
    title: 'Connexion',
    loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent)
  },
  {
    path: 'reset-password-request',
    title: 'Réinitialisation du mot de passe',
    loadComponent: () =>
      import('./reset-password-request/reset-password-request.component').then((c) => c.ResetPasswordRequestComponent)
  },
  {
    path: 'reset-password',
    title: 'Réinitialisation du mot de passe',
    loadComponent: () => import('./reset-password/reset-password.component').then((c) => c.ResetPasswordComponent)
  },
  {
    path: 'edit-solution/:id',
    title: 'Modifier la solution',
    loadComponent: () => import('./edit-solution/edit-solution.component').then((c) => c.EditSolutionComponent),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    title: 'Profil',
    loadComponent: () => import('./profile/profile.component').then((c) => c.ProfileComponent),
    canActivate: [authGuard]
  }
];
