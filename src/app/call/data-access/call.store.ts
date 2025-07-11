import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withProps, withHooks } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, catchError, of, switchMap } from 'rxjs';
import { ICall } from '../../shared/utils/types/models.type';
import { ActivatedRoute } from '@angular/router';

interface ICallStore {
  isLoading: boolean;
  call: [ICall, number] | null;
}

export const CallStore = signalStore(
  withState<ICallStore>({ isLoading: false, call: null }),
  withProps(() => ({
    _http: inject(HttpClient),
    _route: inject(ActivatedRoute),
  })),
  withMethods(({ _http, ...store }) => ({
    loadCall: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((slug) => {
          return _http.get<{ data: [ICall, number] }>(`calls/find-by-slug/${slug}`).pipe(
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
  withHooks({
    onInit: ({ _route, loadCall }) => {
      const slug = _route.snapshot.paramMap.get('slug') || '';
      loadCall(slug);
    },
  }),
);
