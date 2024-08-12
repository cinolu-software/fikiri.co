import { ApplicationConfig } from '@angular/core';
import { provideRouter, TitleStrategy, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PageTitleStrategy } from './page-title.strategy';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { authReducers } from './shared/store/auth/data-access/auth.reducers';
import * as authEffects from './shared/store/auth/data-access/auth.effects';
import { httpInterceptor } from './shared/interceptors/http.interceptor';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled'
      })
    ),
    { provide: TitleStrategy, useClass: PageTitleStrategy },
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([httpInterceptor])),
    provideEffects(authEffects),
    provideStore({
      auth: authReducers
    }),
    provideAnimations(),
    provideToastr({
      progressBar: true,
      progressAnimation: 'increasing'
    })
  ]
};
