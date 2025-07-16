import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { IUser } from '../../../shared/utils/types/models.type';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

interface IDownloadUsersStore {
  isLoading: boolean;
  users: [IUser[], number] | null;
}

export const DownloadUsersStore = signalStore(
  withState<IDownloadUsersStore>({ isLoading: false, users: null }),
  withProps(() => ({
    _http: inject(HttpClient),
    _route: inject(ActivatedRoute),
  })),
  withMethods(({ _http, ...store }) => ({
    downloadUsers: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return _http.get('users/export/csv', { responseType: 'blob' }).pipe(
            tap((blob) => {
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'users.csv';
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
