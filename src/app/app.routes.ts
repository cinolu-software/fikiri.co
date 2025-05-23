import { Route } from '@angular/router';
import { auhtRoutes } from './auth/auth.routes';
import { landingRoutes } from './landing/landing.routes';
import { LayoutComponent } from './shared/layout/layout.component';
import { unauthGuard } from './shared/guards/no-auth.guard';
import { solutionsRoutes } from './solutions/solutions.routes';
import { authGuard } from './shared/guards/auth.guard';
import { profileRoutes } from './profile/profile.routes';
import { callsRoutes } from './calls/calls.routes';

export const routes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'full-layout' },
    loadChildren: () => landingRoutes,
  },
  {
    path: '',
    component: LayoutComponent,
    data: { layout: 'empty' },
    canActivate: [unauthGuard],
    loadChildren: () => auhtRoutes,
  },
  {
    path: 'account',
    component: LayoutComponent,
    data: { layout: 'fixed-topbar' },
    canActivate: [authGuard],
    loadChildren: () => profileRoutes,
  },
  {
    path: 'calls',
    component: LayoutComponent,
    data: { layout: 'full-layout' },
    loadChildren: () => callsRoutes,
  },
  {
    path: 'solutions',
    component: LayoutComponent,
    data: { layout: 'fixed-topbar' },
    loadChildren: () => solutionsRoutes,
  },
  {
    path: '**',
    component: LayoutComponent,
    data: { layout: 'full-layout' },
    loadChildren: () => landingRoutes,
  },
];
