import { patchState, signalStore, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, exhaustMap, of, pipe, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAdminStats } from '../../utils/types/dashboard/stats.type';

interface IDashboardStore {
  isLoading: boolean;
  stats: IAdminStats | null;
}

export const DashboardStore = signalStore(
  withState<IDashboardStore>({ isLoading: false, stats: null }),
  withProps(() => ({
    _http: inject(HttpClient),
  })),
  withMethods(({ _http, ...store }) => ({
    loadStats: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        exhaustMap(() => {
          return _http.get<{ data: IAdminStats }>('stats/admin-stats').pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, stats: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false });
              return of(null);
            }),
          );
        }),
      ),
    ),
  })),
  withHooks({
    onInit({ loadStats }) {
      loadStats();
    },
  }),
);
