import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, catchError, of, switchMap } from 'rxjs';
import { ICall } from '../../shared/utils/types/models.type';

interface ICallStore {
  isLoading: boolean;
  call: ICall | null;
}

export const CallStore = signalStore(
  withState<ICallStore>({ isLoading: false, call: null }),
  withProps(() => ({
    _http: inject(HttpClient),
  })),
  withMethods(({ _http, ...store }) => ({
    loadCall: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) => {
          return _http.get<{ data: ICall }>(`calls/${id}`).pipe(
            tap(({ data }) => patchState(store, { isLoading: false, call: data })),
            catchError(() => {
              patchState(store, { isLoading: false });
              return of(null);
            }),
          );
        }),
      ),
    ),
  })),
);
