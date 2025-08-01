import { patchState, signalStore, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { buildQueryParams } from '../../../shared/helpers/build-query-params';
import { QueryParams } from '../../utils/types/query-params';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../../shared/utils/types/models.type';

interface IDashboardOutreachersStore {
  isLoading: boolean;
  isFiltering: boolean;
  outreachers: [IUser[], number];
}

export const DashboardOutreachersStore = signalStore(
  withState<IDashboardOutreachersStore>({ isLoading: false, isFiltering: false, outreachers: [[], 0] }),
  withProps(() => ({
    _http: inject(HttpClient),
    _route: inject(ActivatedRoute),
  })),
  withMethods(({ _http, ...store }) => ({
    loadOutreachers: rxMethod<QueryParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((queryParams) => {
          const params = buildQueryParams(queryParams);
          if (queryParams.page || queryParams.q) patchState(store, { isFiltering: true });
          return _http.get<{ data: [IUser[], number] }>('users/outreachers/count', { params }).pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, isFiltering: false, outreachers: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, isFiltering: false, outreachers: [[], 0] });
              return of(null);
            }),
          );
        }),
      ),
    ),
  })),
  withHooks({
    onInit({ loadOutreachers, _route }) {
      const queryParams = {
        page: _route.snapshot.queryParamMap.get('page'),
        q: _route.snapshot.queryParamMap.get('q'),
      };
      loadOutreachers(queryParams);
    },
  }),
);
