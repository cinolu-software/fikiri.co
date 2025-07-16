import { patchState, signalStore, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { IUser } from '../../../shared/utils/types/models.type';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { buildQueryParams } from '../../../shared/helpers/build-query-params';
import { QueryParams } from '../../utils/types/users/query-params';
import { ActivatedRoute } from '@angular/router';

interface IDashboardUsersStore {
  isLoading: boolean;
  users: [IUser[], number] | null;
}

export const DashboardUsersStore = signalStore(
  withState<IDashboardUsersStore>({ isLoading: false, users: null }),
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
          return _http.get<{ data: [IUser[], number] }>('users', { params }).pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, users: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, users: null });
              return of(null);
            }),
          );
        }),
      ),
    ),
  })),
  withHooks({
    onInit({ loadUsers, _route }) {
      const page = Number(_route.snapshot.queryParamMap.get('page')) || 1;
      loadUsers({ page });
    },
  }),
);
