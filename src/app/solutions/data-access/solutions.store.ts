import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, map, catchError, of, switchMap } from 'rxjs';
import { ISolution } from '../../shared/utils/types/models.type';
import { QueryParams } from '../types/query-params.type';
import { buildQueryParams } from '../../shared/utils/helpers/build-query-params.fn';

interface ISolutionsStore {
  isLoading: boolean;
  solutions: [ISolution[], number];
}

export const SolutionsStore = signalStore(
  withState<ISolutionsStore>({ isLoading: false, solutions: [[], 0] }),
  withMethods((store, http = inject(HttpClient)) => ({
    loadSolutions: rxMethod<QueryParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((queryParams) => {
          const params = buildQueryParams(queryParams);
          return http.get<{ data: [ISolution[], number] }>('solutions/mapped', { params }).pipe(
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
      loadSolutions({ page: null });
    },
  }),
);
