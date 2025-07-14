import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { IUser } from '../../shared/utils/types/models.type';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { IUpdateInfoPayload } from '../utils/types/update-info.type';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '../../shared/services/toast/toastr.service';
import { AuthStore } from '../../shared/store/auth.store';

interface IUpdateInfoStore {
  isLoading: boolean;
}

export const UpdateInfoStore = signalStore(
  withState<IUpdateInfoStore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    authStore: inject(AuthStore)
  })),
  withMethods(({ _http, _toast, authStore, ...store }) => ({
    updateInfo: rxMethod<IUpdateInfoPayload>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((payload) => {
          return _http.patch<{ data: IUser }>('auth/profile', payload).pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false });
              _toast.showSuccess('Profil mis à jour');
              authStore.setUser(data);
            }),
            catchError(() => {
              patchState(store, { isLoading: false });
              _toast.showError('Erreur lors de la mise à jour du profil');
              return of(null);
            })
          );
        })
      )
    )
  }))
);
