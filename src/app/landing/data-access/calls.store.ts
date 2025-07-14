import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ICall } from '../../shared/utils/types/models.type';
import { QueryParams } from '../utils/types/query-params.type';
import { buildQueryParams } from '../../shared/helpers/build-query-params';

interface ICallsStore {
  isLoading: boolean;
  calls: [ICall[], number] | null;
}

export const CallsStore = signalStore(
  withState<ICallsStore>({ isLoading: false, calls: null }),
  withMethods((store, http = inject(HttpClient)) => ({
    loadCalls: rxMethod<QueryParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((queryParams) => {
          const params = buildQueryParams(queryParams);
          return http.get<{ data: [ICall[], number] }>(`calls/find-published`, { params }).pipe(
            map(({ data }) => patchState(store, { isLoading: false, calls: data })),
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
    onInit({ loadCalls }) {
      loadCalls({ page: null });
    },
  }),
);
