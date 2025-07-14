import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '../../shared/services/toast/toastr.service';
import { Router } from '@angular/router';
import { IUser } from '../../shared/utils/types/models.type';
import { ISignUpPayload } from '../utils/types/sign-up.type';
import { buildQueryParams } from '../../shared/helpers/build-query-params';

interface ISignUpStore {
  isLoading: boolean;
  user: IUser | null;
}

export const SignUpStore = signalStore(
  withState<ISignUpStore>({ isLoading: false, user: null }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    _router: inject(Router),
  })),
  withMethods(({ _http, _toast, _router, ...store }) => ({
    signUp: rxMethod<{ payload: ISignUpPayload; link: string }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((params) => {
          const { payload, link } = params;
          const queryParams = buildQueryParams({ link });
          return _http.post<{ data: IUser }>('auth/sign-up', payload, { params: queryParams }).pipe(
            tap(() => {
              patchState(store, { isLoading: false });
              _toast.showSuccess('Inscription réussie');
              _router.navigate(['/sign-in']);
            }),
            catchError(() => {
              patchState(store, { isLoading: false });
              _toast.showError("Echec lors de l'inscription");
              return of(null);
            }),
          );
        }),
      ),
    ),
  })),
);
