import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, map, catchError, of, switchMap } from 'rxjs';
import { IApplication, ICall } from '../../shared/utils/types/models.type';
import { ToastrService } from '../../shared/services/toast/toastr.service';
import { Router } from '@angular/router';

interface IApplicationStore {
  isLoading: boolean;
  application: IApplication | null;
}

export const ApplicationStore = signalStore(
  withState<IApplicationStore>({ isLoading: false, application: null }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    _router: inject(Router),
  })),
  withMethods(({ _http, _toast, _router, ...store }) => ({
    apply: rxMethod<{ call: string; responses: JSON }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ call, responses }) => {
          return _http.post<{ data: IApplication }>(`solutions`, { call, responses }).pipe(
            tap(({ data }) => {
              _toast.showSuccess('Candidature soumise');
              _router.navigate(['/calls']);
              patchState(store, { isLoading: false, application: data });
            }),
            catchError((err) => {
              patchState(store, { isLoading: false });
              _toast.showError(err.error['message'] || 'Une erreur est survenue');
              return of(err);
            }),
          );
        }),
      ),
    ),
  })),
);
