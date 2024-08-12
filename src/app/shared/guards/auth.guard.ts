import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, map } from 'rxjs';
import { AuthService } from '../store/auth/data-access/auth.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.authenticate().pipe(
    map((user) => !!user),
    catchError(() => {
      router.navigateByUrl('/auth/login');
      return [false];
    })
  );
};
