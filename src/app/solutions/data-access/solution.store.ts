import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withHooks, withProps } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, map, catchError, of, switchMap } from 'rxjs';
import { ISolution } from '../../shared/utils/types/models.type';
import { ActivatedRoute } from '@angular/router';

interface ISolutionStore {
  isLoading: boolean;
  solution: ISolution | null;
}

export const SolutionStore = signalStore(
  withState<ISolutionStore>({ isLoading: false, solution: null }),
  withProps(() => ({
    _http: inject(HttpClient),
    _route: inject(ActivatedRoute),
  })),
  withMethods(({ _http, ...store }) => ({
    loadSolution: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((slug) => {
          return _http.get<{ data: ISolution }>(`solutions/find-by-slug/${slug}`).pipe(
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
  withHooks({
    onInit: ({ _route, loadSolution }) => {
      const slug = _route.snapshot.paramMap.get('slug') || '';
      loadSolution(slug);
    },
  }),
);
