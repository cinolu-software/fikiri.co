import { patchState, signalStore, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { buildQueryParams } from '../../../shared/helpers/build-query-params';
import { QueryParams } from '../../utils/types/users/query-params';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../../shared/utils/types/models.type';

interface IDashboardOutreachersStore {
  isLoading: boolean;
  isDownLoadingCSV: boolean;
  outreachers: [IUser[], number] | null;
}

export const DashboardOutreachersStore = signalStore(
  withState<IDashboardOutreachersStore>({ isLoading: false, isDownLoadingCSV: false, outreachers: null }),
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
          return _http.get<{ data: [IUser[], number] }>('users/outreachers/count', { params }).pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, outreachers: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, outreachers: null });
              return of(null);
            }),
          );
        }),
      ),
    ),
  })),
  withHooks({
    onInit({ loadOutreachers, _route }) {
      const page = Number(_route.snapshot.queryParamMap.get('page')) || 1;
      loadOutreachers({ page });
    },
  }),
);
