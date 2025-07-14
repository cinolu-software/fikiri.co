import { patchState, signalStore, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { IUser } from '../../../shared/utils/types/models.type';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, exhaustMap, of, pipe, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface IUsersStore {
  isLoading: boolean;
  users: [IUser[], number] | null;
}

export const UsersStore = signalStore(
  withState<IUsersStore>({ isLoading: false, users: null }),
  withProps(() => ({
    _http: inject(HttpClient),
  })),
  withMethods(({ _http, ...store }) => ({
    loadUsers: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        exhaustMap(() => {
          return _http.get<{ data: [IUser[], number] }>('users').pipe(
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
    onInit({ loadUsers }) {
      loadUsers();
    },
  }),
);
