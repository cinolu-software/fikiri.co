import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'calls', renderMode: RenderMode.Client },
  { path: 'solutions', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Server },
];
