import { patchState, signalStore, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { IUser } from '../../../shared/utils/types/models.type';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { buildQueryParams } from '../../../shared/helpers/build-query-params';
import { QueryParams } from '../../utils/types/query-params';
import { ActivatedRoute } from '@angular/router';

interface IDashboardUsersStore {
  isLoading: boolean;
  isFiltering: boolean;
  users: [IUser[], number];
}

export const DashboardUsersStore = signalStore(
  withState<IDashboardUsersStore>({ isLoading: false, isFiltering: false, users: [[], 0] }),
  withProps(() => ({
    _http: inject(HttpClient),
    _route: inject(ActivatedRoute),
  })),
  withMethods(({ _http, ...store }) => ({
    loadUsers: rxMethod<QueryParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((queryParams) => {
          const params = buildQueryParams(queryParams);
          if (queryParams) patchState(store, { isFiltering: true });
          return _http.get<{ data: [IUser[], number] }>('users', { params }).pipe(
            map(({ data }) => {
              patchState(store, { isLoading: false, isFiltering: false, users: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, isFiltering: false, users: [[], 0] });
              return of(null);
            }),
          );
        }),
      ),
    ),
    setUsers: (users: [IUser[], number]) => patchState(store, { users }),
  })),
  withHooks({
    onInit({ loadUsers, _route }) {
      const queryParams = {
        page: _route.snapshot.queryParamMap.get('page'),
        q: _route.snapshot.queryParamMap.get('q'),
      };
      loadUsers(queryParams);
    },
  }),
);
