import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QueryParams } from '../../utils/types/query-params';
import { buildQueryParams } from '../../../shared/helpers/build-query-params';

interface IDownloadCallsStore {
  isLoading: boolean;
}

export const DownloadCallsStore = signalStore(
  withState<IDownloadCallsStore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
  })),
  withMethods(({ _http, ...store }) => ({
    downloadCalls: rxMethod<QueryParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((queryParams) => {
          const params = buildQueryParams(queryParams);
          return _http.get('calls/export/csv', { params, responseType: 'blob' }).pipe(
            tap((blob) => {
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'calls.csv';
              a.click();
              window.URL.revokeObjectURL(url);
              patchState(store, { isLoading: false });
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
);
