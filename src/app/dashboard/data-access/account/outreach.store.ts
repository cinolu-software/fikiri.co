import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { IUser } from '../../../shared/utils/types/models.type';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, exhaustMap, of, pipe, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '../../../shared/services/toast/toastr.service';

interface IDashboardOutreachStore {
  isLoading: boolean;
  count: number | null;
  generatingLink: boolean;
}

export const DashboardOutreachStore = signalStore(
  withState<IDashboardOutreachStore>({ isLoading: false, generatingLink: false, count: null }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
  })),
  withMethods(({ _http, _toast, ...store }) => ({
    generateLink: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { generatingLink: true })),
        exhaustMap(() => {
          return _http.post<{ data: IUser }>('users/me/outreach-link', {}).pipe(
            tap(() => {
              patchState(store, { generatingLink: false });
              _toast.showSuccess('Lien de parrainage généré avec succès');
            }),
            catchError(() => {
              patchState(store, { generatingLink: false });
              _toast.showError('Erreur lors de la génération du lien de parrainage');
              return of(null);
            }),
          );
        }),
      ),
    ),
    loadOutreachCount: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        exhaustMap(() => {
          return _http.get<{ data: number }>('users/me/outreach-count').pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, count: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, count: null });
              return of(null);
            }),
          );
        }),
      ),
    ),
  })),
);
