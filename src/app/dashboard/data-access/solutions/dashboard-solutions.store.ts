import { patchState, signalStore, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { ISolution } from '../../../shared/utils/types/models.type';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { buildQueryParams } from '../../../shared/helpers/build-query-params';
import { QueryParams } from '../../utils/types/users/query-params';
import { ActivatedRoute } from '@angular/router';

interface ISolutionsStore {
  isLoading: boolean;
  solutions: [ISolution[], number] | null;
}

export const SolutionsStore = signalStore(
  withState<ISolutionsStore>({ isLoading: false, solutions: null }),
  withProps(() => ({
    _http: inject(HttpClient),
    _route: inject(ActivatedRoute),
  })),
  withMethods(({ _http, ...store }) => ({
    loadSolutions: rxMethod<QueryParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((queryParams) => {
          const params = buildQueryParams(queryParams);
          return _http.get<{ data: [ISolution[], number] }>('solutions', { params }).pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, solutions: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, solutions: null });
              return of(null);
            }),
          );
        }),
      ),
    ),
  })),
  withHooks({
    onInit({ loadSolutions, _route }) {
      const page = Number(_route.snapshot.queryParamMap.get('page')) || 1;
      loadSolutions({ page });
    },
  }),
);
