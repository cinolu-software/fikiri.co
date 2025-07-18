import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of, pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ISolution } from '../../shared/utils/types/models.type';

interface ISolutionsStore {
  isLoading: boolean;
  solutions: ISolution[];
}

export const WinningSolutionsStore = signalStore(
  withState<ISolutionsStore>({ isLoading: false, solutions: [] }),
  withMethods((store, http = inject(HttpClient)) => ({
    loadSolutions: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        exhaustMap(() => {
          return http.get<{ data: ISolution[] }>('solutions/awards').pipe(
            map(({ data }) => patchState(store, { isLoading: false, solutions: data })),
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
    onInit({ loadSolutions }) {
      loadSolutions();
    },
  }),
);
