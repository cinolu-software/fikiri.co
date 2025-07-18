import { patchState, signalStore, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { ISolution } from '../../../shared/utils/types/models.type';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { buildQueryParams } from '../../../shared/helpers/build-query-params';
import { QueryParams } from '../../utils/types/query-params';
import { ActivatedRoute } from '@angular/router';

interface ISolutionsStore {
  isLoading: boolean;
  isFiltering: boolean;
  solutions: [ISolution[], number];
}

export const SolutionsStore = signalStore(
  withState<ISolutionsStore>({ isLoading: false, isFiltering: false, solutions: [[], 0] }),
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
          if (queryParams.page || queryParams.q) patchState(store, { isFiltering: true });
          return _http.get<{ data: [ISolution[], number] }>('solutions', { params }).pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, isFiltering: false, solutions: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, isFiltering: false, solutions: [[], 0] });
              return of(null);
            }),
          );
        }),
      ),
    ),
  })),
  withHooks({
    onInit({ loadSolutions, _route }) {
      const queryParams = {
        page: _route.snapshot.queryParamMap.get('page'),
        q: _route.snapshot.queryParamMap.get('q'),
      };
      loadSolutions(queryParams);
    },
  }),
);
