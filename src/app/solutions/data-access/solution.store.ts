import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, map, catchError, of, switchMap } from 'rxjs';
import { ISolution } from '../../shared/utils/types/models.type';

interface ISolutionStore {
  isLoading: boolean;
  solution: ISolution | null;
}

export const SolutionStore = signalStore(
  withState<ISolutionStore>({ isLoading: false, solution: null }),
  withMethods((store, http = inject(HttpClient)) => ({
    loadSolution: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) => {
          return http.get<{ data: ISolution }>(`solutions/${id}`).pipe(
            map(({ data }) => patchState(store, { isLoading: false, solution: data })),
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
