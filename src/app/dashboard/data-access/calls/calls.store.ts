import { patchState, signalStore, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { ICall } from '../../../shared/utils/types/models.type';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { buildQueryParams } from '../../../shared/helpers/build-query-params';
import { QueryParams } from '../../utils/types/query-params';
import { ActivatedRoute } from '@angular/router';

interface DashboardCallsStore {
  isLoading: boolean;
  isFiltering: boolean;
  calls: [ICall[], number];
}

export const DashboardCallsStore = signalStore(
  withState<DashboardCallsStore>({ isLoading: false, isFiltering: false, calls: [[], 0] }),
  withProps(() => ({
    _http: inject(HttpClient),
    _route: inject(ActivatedRoute),
  })),
  withMethods(({ _http, ...store }) => ({
    loadCalls: rxMethod<QueryParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((queryParams) => {
          const params = buildQueryParams(queryParams);
          if (queryParams.page || queryParams.q) patchState(store, { isFiltering: true });
          return _http.get<{ data: [ICall[], number] }>('calls', { params }).pipe(
            map(({ data }) => {
              patchState(store, { isLoading: false, isFiltering: false, calls: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, isFiltering: false, calls: [[], 0] });
              return of(null);
            }),
          );
        }),
      ),
    ),
  })),
  withHooks({
    onInit({ loadCalls, _route }) {
      const queryParams = {
        page: _route.snapshot.queryParamMap.get('page'),
        q: _route.snapshot.queryParamMap.get('q'),
      };
      loadCalls(queryParams);
    },
  }),
);
